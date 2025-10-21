import { Component, OnInit } from '@angular/core';
import { GlossaryItem } from './types';
import { GlossaryService } from '../services/glossary.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: false,
  template: ` <ul>
    <li *ngFor="let g of glossary">
      <h2>{{ g.term }}</h2>
      <p>{{ g.definition }}</p>
    </li>
  </ul>`,
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  glossary: GlossaryItem[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private glossaryService: GlossaryService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const course = params.get('course') ?? undefined;
      this.loading = true;
      this.error = null;

      this.glossaryService.getGlossary(course).subscribe({
        next: (data: GlossaryItem[]) => {
          this.glossary = data;
          this.loading = false;
        },
        error: (err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err);
          this.error = msg ?? 'Något gick fel';
          this.loading = false;
        },
      });
    });
  }
}
