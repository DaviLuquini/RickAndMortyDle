import { Component } from '@angular/core';
import { PlayButton } from "../../components/play-button/play-button";

@Component({
  selector: 'app-home',
  imports: [PlayButton],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
