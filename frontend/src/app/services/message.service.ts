import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  isShow$: Subject<boolean> = new Subject();
  message: string = '';
  type: 'success' | 'error' = 'success';

  constructor() {}

  private send(message: string) {
    this.message = message;
    this.isShow$.next(true);
  }

  sendSuccess(message: string) {
    this.type = 'success';
    this.send(message);
  }

  sendError(message: string) {
    this.type = 'error';
    this.send(message);
  }

  close() {
    this.isShow$.next(false);
  }
}
