import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TitleMetaService {
  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.route.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        return child;
      }),
      mergeMap(r => r!.data)
    ).subscribe(data => {
      if (data['title']) this.title.setTitle(data['title']);
      if (data['description']) {
        this.meta.updateTag({
          name: 'description',
          content: data['description']
        });
      }
    });
  }
}
