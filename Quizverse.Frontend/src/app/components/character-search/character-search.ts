import { Component, computed, effect, ElementRef, HostListener, inject, OnInit, signal, ViewChild, Output, EventEmitter } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICharacter } from '../../models/character.type';
import { CharacterService } from '../../services/characters.service';
import { CommonModule } from '@angular/common';
import { GuessResultComponent } from './widgets/guess-result/guess-result';
import { IGuessResult } from '../../models/guess-result';
import { PlayButton } from "../../pages/home/widgets/play-button/play-button";
import { LucideAngularModule, MessageSquareQuote } from "lucide-angular";

@Component({
  selector: 'app-character-search',
  standalone: true,
  imports: [CommonModule, GuessResultComponent, PlayButton, LucideAngularModule],
  templateUrl: './character-search.html',
  styleUrl: './character-search.scss'
})
export class CharacterSearch implements OnInit {
  private readonly charactersService = inject(CharacterService);
  @ViewChild('dropdownWrapper', { read: ElementRef, static: false }) dropdownWrapper?: ElementRef<HTMLElement>;
  @ViewChild('gameOverElement', { read: ElementRef, static: false }) gameOverElement?: ElementRef<HTMLElement>;

  public readonly MessageSquareQuote = MessageSquareQuote;
  public showIconCicle = false;
  public characters = toSignal(this.charactersService.getAllCharacters(), { initialValue: [] as ICharacter[] });
  public availableCharacters = signal<ICharacter[]>([]);
  public correctCharacter = signal<ICharacter | undefined>(undefined);
  public searchText = signal('');
  public showDropdown = signal(false);
  public guessHistory = signal<IGuessResult[]>([]);
  public tries = signal(0);
  public isGameOver = signal(false);
  public timeLeft: string = '';

  @Output() triesChange = new EventEmitter<number>();
  @Output() correctCharacterOutput = new EventEmitter<ICharacter>();

  ngOnInit() {
    this.updateTimeLeft();
    setInterval(() => this.updateTimeLeft(), 1000);

    this.updateShowIcon();
    window.addEventListener('resize', () => this.updateShowIcon());
  }

  constructor() {
    effect(() => {
      const allChars = this.characters();
      if (!allChars || allChars.length === 0) return;

      const top100 = [...allChars]
        .sort((a, b) => (b.episodeCount ?? 0) - (a.episodeCount ?? 0))
        .slice(0, 100);

      this.availableCharacters.set(top100);

      if (!this.correctCharacter()) {
        this.getCharacterOfTheDay();
      }
    });
  }

  updateAvailableCharacters(character: ICharacter): void {
    this.availableCharacters.update(chars => chars.filter(c => c.id !== character.id));
  }

  getMostFamousCharacters(count: number): ICharacter[] {
    return [...this.availableCharacters()]
      .sort((a, b) => (b.episodeCount ?? 0) - (a.episodeCount ?? 0))
      .slice(0, count);
  }

  getCharacterOfTheDay(): ICharacter | undefined {
    const chars = this.availableCharacters();
    if (chars.length === 0) return undefined;

    const today = new Date();
    const startDate = new Date("2025-01-01");
    const diffDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));


    const index = diffDays % chars.length;
    const chosen = chars[index];
    this.correctCharacter.set(chosen);
    this.correctCharacterOutput.emit(chosen);
    console.log(chosen.name)
    return chosen;
  }

  makeGuess(guessedCharacter: ICharacter): void {
    const correct = this.correctCharacter();
    if (!correct || this.isGameOver()) return;

    const alreadyGuessed = this.guessHistory().some(g => g.character.id === guessedCharacter.id);
    if (alreadyGuessed) {
      alert('Personagem já adicionado na lista.');
      return;
    }

    this.tries.update(t => {
      const next = t + 1;
      this.triesChange.emit(next);
      return next;
    });

    const episodeDiff = Math.abs((guessedCharacter.episodeCount ?? 0) - (correct.episodeCount ?? 0));
    const isCorrect = guessedCharacter.id === correct.id;

    let episodeMatch: 'exact' | 'close' | 'far' = 'far';
    if (episodeDiff === 0) {
      episodeMatch = 'exact';
    } else if (episodeDiff <= 10) {
      episodeMatch = 'close';
    }

    const result: IGuessResult = {
      character: guessedCharacter,
      isCorrect,
      matches: {
        status: guessedCharacter.status === correct.status,
        species: guessedCharacter.species === correct.species,
        gender: guessedCharacter.gender === correct.gender,
        origin: guessedCharacter.location.name === correct.location.name,
        location: guessedCharacter.origin.name === correct.origin.name,
        episodeCount: episodeMatch
      }
    };

    this.guessHistory.update(history => [result, ...history]);

    this.updateAvailableCharacters(guessedCharacter);

    if (isCorrect) {
      this.isGameOver.set(true);
      setTimeout(() => {
        this.gameOverElement?.nativeElement?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }

    this.searchText.set('');
    this.showDropdown.set(false);
  }

  filteredInputCharacters = computed(() => {
    const query = this.searchText().toLowerCase();

    if (!query) return this.availableCharacters();

    return this.availableCharacters()
      .filter(character => character.name.toLowerCase().includes(query))
      .sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        const aStarts = nameA.startsWith(query) ? 0 : 1;
        const bStarts = nameB.startsWith(query) ? 0 : 1;

        if (aStarts !== bStarts) return aStarts - bStarts;

        return nameA.localeCompare(nameB);
      });
  });

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const el = this.dropdownWrapper?.nativeElement;
    if (!el) return;

    if (!el.contains(event.target as Node)) {
      this.showDropdown.set(false);
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

  updateShowIcon() {
    this.showIconCicle = window.innerWidth >= 1024;
  }
}
