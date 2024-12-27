import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  isOpen$: BehaviorSubject<boolean>;

  constructor() {
    this.isOpen$ = new BehaviorSubject(false);
  }

  show() {
    this.isOpen$.next(true);
  }
}
