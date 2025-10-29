import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlossaryItem, QueryOpts } from '../list/types';
import { map, Observable } from 'rxjs';
import { Root } from '../list/types';
@Injectable({
  providedIn: 'root',
})
export class GlossaryService {
  baseUrl: string =
    'https://glossaryserver-production.up.railway.app/api/glossary';

  constructor(private http: HttpClient) {}

  getGlossary(opts: QueryOpts = {}): Observable<GlossaryItem[]> {
    let params = new HttpParams();
    for (const [k, v] of Object.entries(opts)) {
      if (v !== undefined && v !== null && String(v) !== '') {
        params = params.set(k, String(v));
      }
    }

    return this.http.get<Root>(this.baseUrl, { params }).pipe(
      map((res) => (Array.isArray(res.data) ? res.data : [])),
      map((items) =>
        items.map((g) => ({
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
