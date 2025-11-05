import { Component, Input } from '@angular/core';
import { ICharacter } from '../../../../../models/character';

@Component({
  selector: 'app-card-emoji',
  imports: [],
  templateUrl: './card-emoji.html',
  styleUrl: './card-emoji.scss'
})
export class CardEmoji {
  @Input({ required: true }) tries = 0;
  @Input({ required: true }) correctCharacter?: ICharacter;

  showEmoji(triesRequired: number, emojiIndex: number): string {
    return this.tries >= triesRequired
      ? this.correctCharacter?.emoji?.[emojiIndex] ?? "?"
      : "?";
  }
}
