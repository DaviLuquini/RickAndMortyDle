import { Component, Input } from '@angular/core';
import { LucideAngularModule, Image, Lightbulb } from "lucide-angular";

@Component({
  selector: 'app-hint-card',
  imports: [LucideAngularModule],
  templateUrl: './hint-card.html',
  styleUrl: './hint-card.scss'
})
export class HintCard {
  public readonly Math = Math;
  public readonly Image = Image;
  public readonly Lightbulb = Lightbulb;
  @Input() tries = 0;
}
