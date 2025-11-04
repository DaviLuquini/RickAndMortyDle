import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IGuessResult } from '../../../../../components/character-search/models/guess-result';

@Component({
  selector: 'app-classic-guess-result',
  imports: [CommonModule],
  templateUrl: './classic-guess-result.html',
  styleUrl: './classic-guess-result.scss'
})
export class ClassicGuessResultComponent {
  @Input({ required: true }) result!: IGuessResult;
  @Input() showHeaders = false;

  getMatchColor(): string {
    return 'bg-green-600';
  }

  getNoMatchColor(): string {
    return 'bg-red-600';
  }

  getEpisodeColor(match: 'exact' | 'close' | 'far'): string {
    switch (match) {
      case 'exact': return 'bg-green-600';
      case 'close': return 'bg-orange-500';
      case 'far': return 'bg-red-600';
    }
  }

  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
