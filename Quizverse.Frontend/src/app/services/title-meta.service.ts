import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TitleMetaService {
  private readonly renderer: Renderer2;

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private readonly doc: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.route.firstChild;
          while (child?.firstChild) child = child.firstChild;
          return child;
        }),
        mergeMap(r => r!.data)
      )
      .subscribe(data => {
        if (data['title']) this.title.setTitle(data['title']);

        if (data['description']) {
          this.meta.updateTag({
            name: 'description',
            content: data['description']
          });
        }

        const canonicalUrl =
          data['canonical'] ||
          `https://rickandmortydle.com${this.router.url}`;

        let link: HTMLLinkElement | null =
          this.doc.querySelector("link[rel='canonical']");

        if (link) {
          link.setAttribute('href', canonicalUrl);
        } else {
          link = this.renderer.createElement('link');
          link?.setAttribute('rel', 'canonical');
          link?.setAttribute('href', canonicalUrl);
          this.renderer.appendChild(this.doc.head, link);
        }
      });
  }
}
