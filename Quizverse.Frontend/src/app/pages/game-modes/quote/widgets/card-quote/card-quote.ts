import { Component, Input } from '@angular/core';
import { ICharacter } from '../../../../../models/character';

@Component({
  selector: 'app-card-quote',
  imports: [],
  templateUrl: './card-quote.html',
  styleUrl: './card-quote.scss'
})
export class CardQuote {
  @Input({ required: true }) correctCharacter?: ICharacter;
}
