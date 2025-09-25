import { Component } from '@angular/core';
import { Title } from "../../../components/title/title";
import { HintCard } from "./widgets/hint-card/hint-card";

@Component({
  selector: 'app-classic',
  imports: [Title, HintCard],
  templateUrl: './classic.html',
  styleUrl: './classic.scss'
})
export class Classic {

}
