import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet> `,
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'my-classic-app';
}
