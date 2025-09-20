import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-play-button',
  imports: [CommonModule],
  templateUrl: './play-button.html',
  styleUrl: './play-button.scss'
})
export class PlayButton {
  @Input() onClick!: () => void;
  @Input() className: string = '';
}
