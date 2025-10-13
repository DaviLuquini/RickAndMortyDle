import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from "../../../components/title/title";
import { HintCard } from "./widgets/hint-card/hint-card";
import { CharacterSearch } from "../../../components/character-search/character-search";

@Component({
  selector: 'app-classic',
  imports: [CommonModule, Title, HintCard, CharacterSearch],
  templateUrl: './classic.html',
  styleUrl: './classic.css'
})
export class Classic {

}
