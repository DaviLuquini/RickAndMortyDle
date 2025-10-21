import { Component } from '@angular/core';
import { Image, Landmark, Laugh, LucideAngularModule, MessageSquareQuote } from "lucide-angular";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Title } from "../../components/title/title";
import { PlayButton } from '../../components/play-button/play-button';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, PlayButton, LucideAngularModule, Title],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  readonly Landmark = Landmark;
  readonly MessageSquareQuote = MessageSquareQuote;
  readonly Laugh = Laugh;
  readonly Image = Image;

  constructor(private readonly router: Router) {}

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
