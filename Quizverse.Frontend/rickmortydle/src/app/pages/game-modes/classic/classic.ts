import { Component, signal } from '@angular/core';
import { Title } from "../../../components/title/title";
import { HintCard } from "./widgets/hint-card/hint-card";
import { CharacterSearch } from "../../../components/character-search/character-search";
import { ICharacter } from '../../../models/character.type';

@Component({
  selector: 'app-classic',
  imports: [Title, HintCard, CharacterSearch],
  templateUrl: './classic.html',
  styleUrl: './classic.scss'
})
export class Classic {
  public tries = signal(0);
  public correctCharacter!: ICharacter;
}
