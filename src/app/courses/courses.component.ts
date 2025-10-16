//import decorator
import { Component, OnInit } from '@angular/core';

//call decorator function
@Component({
  selector: 'courses', //<courses>,
  template:
    '<h2> {{title}} </h2> <button (click)="toggleTitle()" >PUSH</button>',
  standalone: false,
})
export class CoursesComponent implements OnInit {
  constructor() {}

  private _title = 'List of courses';
  private _no = 'no';

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get no(): string {
    return this._no;
  }

  toggleTitle(): void {
    this.title = this.title === this.no ? 'List of courses' : this.no;
  }

  ngOnInit(): void {}
}
