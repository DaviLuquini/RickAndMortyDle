import { Component, signal } from '@angular/core';
import { Title } from "../../../components/title/title";
import { HintCard } from "./widgets/hint-card/hint-card";
import { CharacterSearch } from "../../../components/character-search/character-search";

@Component({
  selector: 'app-classic',
  imports: [Title, HintCard, CharacterSearch],
  templateUrl: './classic.html',
  styleUrl: './classic.scss'
})
export class Classic {
  tries = signal(0);
}
