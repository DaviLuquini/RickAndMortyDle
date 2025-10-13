import { Component } from '@angular/core';
import { LucideAngularModule, Image, Lightbulb } from "lucide-angular";

@Component({
  selector: 'app-hint-card',
  imports: [LucideAngularModule],
  templateUrl: './hint-card.html',
  styleUrl: './hint-card.css'
})
export class HintCard {
  readonly Image = Image;
  readonly Lightbulb = Lightbulb;
}
