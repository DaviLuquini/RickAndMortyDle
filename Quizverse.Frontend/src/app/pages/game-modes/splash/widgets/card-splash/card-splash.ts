import { Component, Input } from '@angular/core';
import { ICharacter } from '../../../../../models/character';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-splash',
  imports: [CommonModule],
  templateUrl: './card-splash.html',
  styleUrl: './card-splash.scss'
})
export class CardSplash {
  @Input({ required: true }) tries = 0;
  @Input({ required: true }) correctCharacter?: ICharacter;

  get zoomScale(): string {
    const scale = Math.max(6 - this.tries * 0.45, 1);
    return `scale(${scale})`;
  }
}
