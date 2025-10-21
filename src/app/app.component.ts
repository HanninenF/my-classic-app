import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h1>Angular</h1>
    <courses></courses>
    <app-form></app-form>
    <app-list></app-list> `,
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'my-classic-app';
}
