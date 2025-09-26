import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICharacter } from '../../models/character.type';
import { CharacterService } from '../../services/characters.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-search',
  imports: [CommonModule],
  templateUrl: './character-search.html',
  styleUrl: './character-search.scss'
})
export class CharacterSearch {
  private readonly charactersService = inject(CharacterService);

  characters = toSignal(this.charactersService.getAllCharacters(), { initialValue: [] as ICharacter[] });

  availableCharacters = signal<ICharacter[]>([]);
  correctCharacter = signal<ICharacter | undefined>(undefined);
  searchText = signal('');


  constructor() {
    const allChars = this.characters();
    const top100 = [...allChars]
      .sort((a, b) => (b.episodeCount ?? 0) - (a.episodeCount ?? 0))
      .slice(0, 100);
    this.availableCharacters.set(top100);
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
  
}
