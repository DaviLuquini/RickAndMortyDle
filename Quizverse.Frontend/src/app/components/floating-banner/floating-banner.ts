import {
  Component,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
import {
  BANNER_TRANSLATIONS,
  BannerLocale,
  detectInitialBannerLocale,
  resolveLocaleFromCountry,
} from './floating-banner.i18n';

/** Floating promotional banner for the Calorita calorie counter app. */
@Component({
  selector: 'app-floating-banner',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './floating-banner.html',
  styleUrl: './floating-banner.scss',
})
export class FloatingBanner implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

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
  public locale = signal<BannerLocale>(detectInitialBannerLocale());

  public readonly copy = computed(() => BANNER_TRANSLATIONS[this.locale()]);
  public readonly targetUrl = computed(
    () =>
      `https://play.google.com/store/apps/details?id=app.calorita&hl=${this.copy().playStoreHl}`
  );

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      if (sessionStorage.getItem('calorita_banner_country')) {
        return;
      }
    } catch {
      // Ignore storage access errors
    }

    void this.resolvePlayerCountry();
  }

  private async resolvePlayerCountry(): Promise<void> {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 2500);

    try {
      const response = await fetch('https://api.country.is/', {
        signal: controller.signal,
      });
      if (!response.ok) return;

      const data = (await response.json()) as { country?: string };
      const country = data?.country?.trim().toUpperCase();
      if (!country || !/^[A-Z]{2}$/.test(country)) return;

      try {
        sessionStorage.setItem('calorita_banner_country', country);
      } catch {
        // Ignore storage access errors
      }

      this.locale.set(resolveLocaleFromCountry(country));
    } catch {
      // Keep synchronous timezone/locale detection on network or adblocker failure
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

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
