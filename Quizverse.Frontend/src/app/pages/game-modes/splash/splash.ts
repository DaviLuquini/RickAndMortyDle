import { Component, inject, ViewChild } from '@angular/core';
import { CharacterSearch } from '../../../components/character-search/character-search';
import { CharacterSearchService } from '../../../services/character-search.service';
import { Title } from "../../../components/title/title";
import { CardSplash } from "./widgets/card-splash/card-splash";

@Component({
  selector: 'app-splash',
  imports: [Title, CharacterSearch, CardSplash],
  templateUrl: './splash.html',
  styleUrl: './splash.scss'
})
export class Splash {
  @ViewChild(CharacterSearch) characterSearchComponent?: CharacterSearch;
  public readonly characterSearchService = inject(CharacterSearchService);
  public correctCharacter = this.characterSearchService.correctCharacter;
  public tries = this.characterSearchService.tries;
  public characters = this.characterSearchService.characters;

  constructor() {
    this.characterSearchService.initialize('splash');
  }
}
