import { Component } from '@angular/core';
import { Image, Info, Landmark, Laugh, LucideAngularModule, MessageSquareQuote } from "lucide-angular";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Title } from "../../components/title/title";
import { PlayButton } from '../../components/play-button/play-button';
import { AboutModal } from '../../components/about-modal/about-modal';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, PlayButton, LucideAngularModule, Title, AboutModal],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  public readonly Landmark = Landmark;
  public readonly MessageSquareQuote = MessageSquareQuote;
  public readonly Laugh = Laugh;
  public readonly Image = Image;
  public readonly Info = Info;
  public showAboutModal = false;

  constructor(private readonly router: Router) { }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  openAboutModal() {
    this.showAboutModal = true;
  }

  closeAboutModal() {
    this.showAboutModal = false;
  }
}
