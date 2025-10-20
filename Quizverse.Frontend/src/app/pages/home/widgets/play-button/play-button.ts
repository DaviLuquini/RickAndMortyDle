import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-play-button',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './play-button.html',
  styleUrl: './play-button.scss'
})
export class PlayButton {
  @Input() customStyle?: string;
  @Input() showIconCicle = true;
}
