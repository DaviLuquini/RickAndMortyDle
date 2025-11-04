import { Component, inject, ViewChild } from '@angular/core';
import { CharacterSearch } from "../../../components/character-search/character-search";
import { Title } from "../../../components/title/title";
import { CharacterSearchService } from '../../../services/character-search.service';
import { CardQuote } from "./widgets/card-quote/card-quote";

@Component({
  selector: 'app-quote',
  imports: [CharacterSearch, Title, CardQuote],
  templateUrl: './quote.html',
  styleUrl: './quote.scss'
})
export class Quote {
  @ViewChild(CharacterSearch) characterSearchComponent?: CharacterSearch;
  public readonly characterSearchService = inject(CharacterSearchService);
  public correctCharacter = this.characterSearchService.correctCharacter;
  public characters = this.characterSearchService.characters;

  constructor() {
    this.characterSearchService.initialize('quote');
  }
}
