import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlossaryItem, QueryOpts } from './types';
import { GlossaryService } from '../services/glossary.service';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  distinctUntilChanged,
  map,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: false,
  template: ` <ul class="glossary_container">
    <li class="glossary_list" *ngFor="let g of glossary">
      <h2 class="term">{{ g.term }}</h2>
      <p class="definition">{{ g.definition }}</p>

      <ul
        class="bulletPoints_container"
        *ngIf="g.bulletPoints && g.bulletPoints.length"
      >
        <li class="bulletPoints_list" *ngFor="let b of g.bulletPoints">
          {{ b }}
        </li>
      </ul>
    </li>
  </ul>`,
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, OnDestroy {
  glossary: GlossaryItem[] = [];
  loading = true;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private glossaryService: GlossaryService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map((pm) => {
          const opts: QueryOpts = {
            domain: pm.get('domain') ?? undefined,
            kind: pm.get('kind') ?? undefined,
            course: pm.get('course') ?? undefined,
            q: pm.get('q') ?? undefined,
            sort: pm.get('sort') ?? undefined,
            page: pm.get('page') ? Number(pm.get('page')) : undefined,
            limit: pm.get('limit') ? Number(pm.get('limit')) : undefined,
          };
          // undvik onödiga refetches
          return JSON.stringify(opts);
        }),
        distinctUntilChanged(),
        map((s) => JSON.parse(s) as QueryOpts),
        switchMap((opts) => {
          this.loading = true;
          this.error = null;
          return this.glossaryService.getGlossary(opts).pipe(
            catchError((err) => {
              const msg = err instanceof Error ? err.message : String(err);
              this.error = msg || 'Något gick fel';
              this.loading = false;
              return of([] as GlossaryItem[]);
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.glossary = data;
        this.loading = false;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
