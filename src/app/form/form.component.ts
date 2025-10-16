import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  private _localState = '';
  private _newState: string[] = [];

  get localState() {
    return this._localState;
  }

  set localState(v) {
    this._localState = v;
  }

  get newState(): string[] {
    return this._newState;
  }

  set newState(v: string) {
    this._newState.push(v);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.localState.trim()) {
      this.newState.push(this.localState.trim());
      this.localState = '';
    }
  }
}
