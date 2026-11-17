import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  ExternalLink,
  Sparkles,
  X,
  Camera,
  Flame,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-angular';

/** Floating promotional banner for the Calorita calorie counter app. */
@Component({
  selector: 'app-floating-banner',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './floating-banner.html',
  styleUrl: './floating-banner.scss',
})
export class FloatingBanner {
  public readonly ExternalLink = ExternalLink;
  public readonly Sparkles = Sparkles;
  public readonly X = X;
  public readonly Camera = Camera;
  public readonly Flame = Flame;
  public readonly Check = Check;
  public readonly ChevronDown = ChevronDown;
  public readonly ChevronUp = ChevronUp;

  public isVisible = signal(true);
  public isMinimized = signal(false);

  public readonly targetUrl =
    'https://play.google.com/store/apps/details?id=app.calorita&hl=pt_BR';

  toggleMinimize(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isMinimized.update((v) => !v);
  }

  close(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isVisible.set(false);
  }
}
