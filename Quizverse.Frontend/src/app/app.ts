import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleMetaService } from './services/title-meta.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('rickandmortydle');
  constructor(private readonly titleMeta: TitleMetaService) { }
}
