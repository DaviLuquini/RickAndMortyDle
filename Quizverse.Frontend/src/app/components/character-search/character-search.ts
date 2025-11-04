import { Component, computed, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { ICharacter } from '../../models/character';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, MessageSquareQuote } from "lucide-angular";
import { PlayButton } from '../play-button/play-button';
import { CharacterSearchService } from '../../services/character-search.service';
import { IGuessResult } from './models/guess-result';
import { ClassicGuessResultComponent } from '../../pages/game-modes/classic/widgets/classic-guess-result/classic-guess-result';
import { GuessResult } from "../../pages/game-modes/widgets/guess-result/guess-result";

@Component({
  selector: 'app-character-search',
  imports: [CommonModule, ClassicGuessResultComponent, PlayButton, LucideAngularModule, GuessResult],
  templateUrl: './character-search.html',
  styleUrl: './character-search.scss'
})
export class CharacterSearch implements OnInit {
  @ViewChild('dropdownWrapper', { read: ElementRef, static: false }) dropdownWrapper?: ElementRef<HTMLElement>;
  @ViewChild('gameOverElement', { read: ElementRef, static: false }) gameOverElement?: ElementRef<HTMLElement>;
  @Output() gameOver = new EventEmitter<void>();
  @Input({ required: true }) gameMode!: string;
  @Input({ required: true }) characterSearchService!: CharacterSearchService;
  public readonly MessageSquareQuote = MessageSquareQuote;
  public showIconCircle = false;
  public searchText = signal('');
  public showDropdown = signal(false);
  public isGameOver = signal(false);
  public guessHistory = signal<IGuessResult[]>([]);
  public tries = signal(0);
  public timeLeft = '';

  ngOnInit() {
    this.isGameOver = this.characterSearchService.isGameOver;
    this.guessHistory = this.characterSearchService.guessHistory;
    this.tries = this.characterSearchService.tries;
    this.timeLeft = this.characterSearchService.timeLeft;

    this.updateShowPlayButtonIcon();
    window.addEventListener('resize', () => this.updateShowPlayButtonIcon());
  }

  makeGuess(guessedCharacter: ICharacter): void {
    const correct = this.characterSearchService.correctCharacter();

    if (!correct || this.characterSearchService.isGameOver()) return;

    const alreadyGuessed = this.characterSearchService.guessHistory().some(g => g.character.id === guessedCharacter.id);
    if (alreadyGuessed) {
      alert('Personagem já adicionado na lista.');
      return;
    }

    this.characterSearchService.tries.update(t => {
      const next = t + 1;
      this.characterSearchService.triesChange.emit(next);
      return next;
    });

    const isCorrect = btoa(guessedCharacter.id.toString()) === this.characterSearchService.correctCharacterHash;

    let result: IGuessResult;
    if (this.gameMode == 'classic') {
      const episodeDiff = Math.abs((guessedCharacter.episodeCount ?? 0) - (correct.episodeCount ?? 0));

      let episodeMatch: 'exact' | 'close' | 'far' = 'far';
      if (episodeDiff === 0) {
        episodeMatch = 'exact';
      } else if (episodeDiff <= 10) {
        episodeMatch = 'close';
      }

      result = {
        character: guessedCharacter,
        isCorrect,
        matches: {
          status: guessedCharacter.status === correct.status,
          species: guessedCharacter.species === correct.species,
          gender: guessedCharacter.gender === correct.gender,
          origin: guessedCharacter.origin.name === correct.origin.name,
          location: guessedCharacter.location.name === correct.location.name,
          episodeCount: episodeMatch
        }
      };
    } else {
      result = {
        character: guessedCharacter,
        isCorrect,
      };
    }

    this.characterSearchService.guessHistory.update(history => [result, ...history]);
    this.characterSearchService.updateAvailableCharacters(guessedCharacter);
    this.characterSearchService.saveGameState();

    if (isCorrect) {
      this.characterSearchService.isGameOver.set(true);
      this.characterSearchService.saveGameState();
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

    if (!query) return this.characterSearchService.availableCharacters();

    return this.characterSearchService.availableCharacters()
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

  updateShowPlayButtonIcon() {
    this.showIconCircle = window.innerWidth >= 1024;
  }
}
