import { Component, Input } from '@angular/core';
import { IGuessResult } from '../../../../components/character-search/models/guess-result';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guess-result',
  imports: [CommonModule],
  templateUrl: './guess-result.html',
  styleUrl: './guess-result.scss'
})
export class GuessResult {
  @Input({ required: true }) result!: IGuessResult;

  getMatchColor(): string {
    return 'border-2 border-green-200 bg-green-500';
  }

  getNoMatchColor(): string {
    return 'border-2 border-red-300 bg-red-500';
  }
}
