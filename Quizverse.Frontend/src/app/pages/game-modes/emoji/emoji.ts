import { Component, inject, ViewChild } from '@angular/core';
import { CharacterSearch } from '../../../components/character-search/character-search';
import { CharacterSearchService } from '../../../services/character-search.service';
import { Title } from "../../../components/title/title";
import { CardEmoji } from "./widgets/card-emoji/card-emoji";

@Component({
  selector: 'app-emoji',
  imports: [Title, CharacterSearch, CardEmoji],
  templateUrl: './emoji.html',
  styleUrl: './emoji.scss'
})
export class Emoji {
  @ViewChild(CharacterSearch) characterSearchComponent?: CharacterSearch;
  public readonly characterSearchService = inject(CharacterSearchService);
  public correctCharacter = this.characterSearchService.correctCharacter;
  public tries = this.characterSearchService.tries;
  public characters = this.characterSearchService.characters;

  constructor() {
    this.characterSearchService.initialize('emoji');
  }
}
