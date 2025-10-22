import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlossaryItem } from '../list/types';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlossaryService {
  baseUrl: string =
    'https://glossaryserver-production.up.railway.app/api/glossary';

  constructor(private http: HttpClient) {}

  getGlossary(
    opts: { course?: string; sort?: string } = {}
  ): Observable<GlossaryItem[]> {
    let params = new HttpParams();
    if (opts.course) params = params.set('course', opts.course);
    if (opts.sort) params = params.set('sort', opts.sort);

    return this.http
      .get<{ data: GlossaryItem[] }>(this.baseUrl, { params })
      .pipe(
        map((response) =>
          response.data.map((g) => ({
            ...g,
            term: this.capitalizeTerm(g.term),
          }))
        )
      );
  }

  private capitalizeTerm(term?: string): string {
    if (!term) return '(glosa saknas)';
    return term.charAt(0).toUpperCase() + term.slice(1);
  }
}
