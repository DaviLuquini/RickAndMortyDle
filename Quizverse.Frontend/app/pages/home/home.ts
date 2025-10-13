import { Component } from '@angular/core';
import { PlayButton } from "./widgets/play-button/play-button";
import { Image, Landmark, Laugh, LucideAngularModule, MessageSquareQuote } from "lucide-angular";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from "../../components/title/title";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, PlayButton, LucideAngularModule, Title],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  readonly Landmark = Landmark;
  readonly MessageSquareQuote = MessageSquareQuote;
  readonly Laugh = Laugh;
  readonly Image = Image;

  constructor(private router: Router) {}

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
