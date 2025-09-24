import { Component } from '@angular/core';
import { PlayButton } from "../../components/play-button/play-button";
import { CircleQuestionMark, LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-home',
  imports: [PlayButton, LucideAngularModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  readonly CircleQuestionMark = CircleQuestionMark;
}
