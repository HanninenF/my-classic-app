import { HttpClient } from '@angular/common/http';
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

  getGlossary(course?: string): Observable<GlossaryItem[]> {
    const url = course
      ? `${this.baseUrl}?course=${encodeURIComponent(course)}`
      : this.baseUrl;

    return this.http.get<{ data: GlossaryItem[] }>(url).pipe(
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
