import { Injectable } from '@angular/core';
import { Entry } from '@/Entry';
import { BehaviorSubject } from 'rxjs';

export type StyledEntry = Entry & { style?: { [key: string]: string } };

@Injectable({
  providedIn: 'root',
})
export class MemorizeService {
  entries: StyledEntry[] = [];
  currentEntryIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentEntryIndex: number = 0;

  constructor() {
    this.entries.push(new Entry(1, 'Text 1', 'Context 1', 'Translation 1'));
    this.entries.push(new Entry(2, 'Text 2', 'Context 2', 'Translation 2'));
    this.entries.push(new Entry(3, 'Text 3', 'Context 3', 'Translation 3'));
    this.entries.push(new Entry(4, 'Text 4', 'Context 4', 'Translation 4'));

    this.currentEntryIndex$.subscribe((value) => {
      this.currentEntryIndex = value;
    });
  }

  goNext() {
    this.currentEntryIndex$.next(this.currentEntryIndex + 1);
  }

  resetCurrentIndex() {
    this.currentEntryIndex$.next(0);
  }

  goBegin() {
    this.resetCurrentIndex();
  }
}
