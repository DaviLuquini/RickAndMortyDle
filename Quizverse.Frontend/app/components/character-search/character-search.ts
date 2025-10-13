import { Component, computed, effect, ElementRef, HostListener, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICharacter } from '../../models/character.type';
import { CharacterService } from '../../services/characters.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-search',
  imports: [CommonModule],
  templateUrl: './character-search.html',
  styleUrl: './character-search.css'
})
export class CharacterSearch {
  private readonly charactersService = inject(CharacterService);
  private readonly elementRef = inject(ElementRef);
  public characters = toSignal(this.charactersService.getAllCharacters(), { initialValue: [] as ICharacter[] });
  public availableCharacters = signal<ICharacter[]>([]);
  public correctCharacter = signal<ICharacter | undefined>(undefined);
  public searchText = signal('');
  public showDropdown = signal(false);

  constructor() {
    effect(() => {
      const allChars = this.characters();
      if (!allChars || allChars.length === 0) return;

      this.availableCharacters.set(allChars);

      const top100 = this.getMostFamousCharacters(100);
      this.availableCharacters.set(top100);
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

  getCorrectCharacter(): ICharacter | undefined {
    const chars = this.availableCharacters();
    if (chars.length === 0) return undefined;

    const randomIndex = Math.floor(Math.random() * chars.length);
    const chosen = chars[randomIndex];
    this.correctCharacter.set(chosen);
    return chosen;
  }

  filteredInputCharacters = computed(() => {
    const query = this.searchText().toLowerCase();

    if (!query) return this.availableCharacters();

    return this.availableCharacters().filter(character => character.name.toLowerCase().includes(query));
  });

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown.set(false);
    }
  }
}
