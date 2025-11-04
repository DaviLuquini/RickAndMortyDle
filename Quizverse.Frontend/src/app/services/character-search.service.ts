import { DestroyRef, EventEmitter, inject, Injectable, OnDestroy, Output, signal } from "@angular/core";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ICharacter } from "../models/character";
import { CharacterService } from "./characters.service";
import { IGameState } from "../components/character-search/models/game-state";
import { IGuessResult } from "../components/character-search/models/guess-result";
import { characterQuotes } from "../models/characters-quotes";

@Injectable({
    providedIn: 'any'
})
export class CharacterSearchService implements OnDestroy {
    private readonly charactersService = inject(CharacterService);
    private readonly destroyRef = inject(DestroyRef);
    private intervalId?: any;
    private gameMode!: string;
    public correctCharacterHash: string | undefined;
    public characters = signal<ICharacter[]>([]);
    public availableCharacters = signal<ICharacter[]>([]);
    public correctCharacter = signal<ICharacter | undefined>(undefined);
    public guessHistory = signal<IGuessResult[]>([]);
    public tries = signal(0);
    public isGameOver = signal(false);
    public timeLeft: string = '';

    @Output() triesChange = new EventEmitter<number>();
    @Output() correctCharacterOutput = new EventEmitter<ICharacter>();

    public initialize(gameMode: string): void {
        this.gameMode = gameMode;
        this.initializeGame();
        this.loadCharacters();
    }

    private loadCharacters(): void {
        const cached = localStorage.getItem('rickmortydle-characters');

        if (cached) {
            const cachedChars = JSON.parse(cached) as ICharacter[];
            if (this.gameMode == 'quote') {
                for (const c of cachedChars) {
                    c.quote = characterQuotes[c.id];
                }
            }

            this.characters.set(cachedChars);
            this.availableCharacters.set(cachedChars);
            this.loadGameState();

            if (!this.correctCharacter()) {
                this.getCharacterOfTheDay();
            }
        } else {
            this.charactersService.getCharacters(100)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(chars => {
                    localStorage.setItem('rickmortydle-characters', JSON.stringify(chars));

                    this.characters.set(chars);
                    this.availableCharacters.set(chars);
                    this.loadGameState();

                    if (!this.correctCharacter()) {
                        this.getCharacterOfTheDay();
                    }
                });
        }
    }

    private initializeGame() {
        this.updateTimeLeft();

        this.intervalId = setInterval(() => {
            this.updateTimeLeft();

            if (this.timeLeft === '00:00:00') {
                this.getCharacterOfTheDay();
                localStorage.removeItem(`rickmortydle-game-${this.gameMode}`);
                this.updateTimeLeft();
            }
        }, 1000);
    }

    updateAvailableCharacters(character: ICharacter): void {
        this.availableCharacters.update(chars => chars.filter(c => c.id !== character.id));
    }

    getCharacterOfTheDay(): ICharacter | undefined {
        let chars = this.availableCharacters();
        if (chars.length === 0) return undefined;

        if (this.gameMode == 'quote') {
            chars = chars.filter(c => c.quote);
        }

        const today = new Date();
        const startDate = new Date("2025-01-01");
        const diffDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

        const modeOffset = this.hashString(this.gameMode) % chars.length;
        const index = (diffDays + modeOffset) % chars.length;

        const correctChar = chars[index];
        this.correctCharacter.set(correctChar);
        this.correctCharacterOutput.emit(correctChar);
        this.correctCharacterHash = btoa(correctChar.id.toString());
        console.log(correctChar.name)
        return correctChar;
    }

    public saveGameState(): void {
        const correct = this.correctCharacter();
        if (!correct) return;

        const state: IGameState = {
            date: new Date().toDateString(),
            correctCharacterHash: btoa(correct.id.toString()),
            guessHistory: this.guessHistory(),
            tries: this.tries(),
            isGameOver: this.isGameOver(),
            availableCharacters: this.availableCharacters()
        };

        localStorage.setItem(`rickmortydle-game-${this.gameMode}`, JSON.stringify(state));
    }

    public loadGameState(): void {
        const saved = localStorage.getItem(`rickmortydle-game-${this.gameMode}`);
        if (!saved) return;

        const state: IGameState = JSON.parse(saved);
        const today = new Date().toDateString();

        if (state.date === today) {
            this.correctCharacterHash = state.correctCharacterHash;
            const correctCharId = Number.parseInt(atob(state.correctCharacterHash), 10);
            const allChars = this.characters();
            const correctChar = allChars.find(c => c.id === correctCharId);
            this.correctCharacter.set(correctChar);
            this.correctCharacterOutput.emit(correctChar);

            this.guessHistory.set(state.guessHistory);
            this.tries.set(state.tries);
            this.triesChange.emit(this.tries());
            this.isGameOver.set(state.isGameOver);
            this.availableCharacters.set(state.availableCharacters);
        } else {
            localStorage.removeItem(`rickmortydle-game-${this.gameMode}`);
        }
    }

    private updateTimeLeft(): void {
        const now = new Date();
        const nextMidnight = new Date(now);
        nextMidnight.setHours(24, 0, 0, 0);

        const diffMs = nextMidnight.getTime() - now.getTime();
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

        this.timeLeft = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
    }

    private pad(num: number): string {
        return num.toString().padStart(2, '0');
    }

    private hashString(str: string): number {
        return Array.from(str).reduce((acc, c) => acc + (c.codePointAt(0) ?? 0), 0);
    }

    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}