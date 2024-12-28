import { Inject, inject, Injectable } from '@angular/core';
import { Entry } from '@/Entry';
import { BehaviorSubject } from 'rxjs';
import { StateService } from '@/services/state.service';
import { HttpClient } from '@angular/common/http';
import { DbElementType } from '@/types/db';

export type StyledEntry = Entry & { style?: { [key: string]: string } };

@Injectable({
  providedIn: 'root',
})
export class MemoService {
  entries: StyledEntry[] = [];
  currentEntryIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentEntryIndex: number = 0;
  currentTranslateIndex: number = -1;
  currentEntry: Entry;

  state: StateService = inject(StateService);
  http: HttpClient = inject(HttpClient);

  constructor(
    @Inject('isMemoServiceInTestMode') isMemoServiceInTestMode: boolean,
  ) {
    if (isMemoServiceInTestMode) {
      this.addTestEntries();
    }

    this.currentEntryIndex$.subscribe((index) => {
      this.currentEntryIndex = index;
      this.currentEntry = this.entries[index];
      this.currentTranslateIndex = index - 1;
    });
    this.currentEntry = this.entries[0];

    this.state.sectionId$.subscribe((sectionId) => this.getEntries(sectionId));
  }

  addTestEntries() {
    for (let i = 1; i <= 4; i++) {
      this.entries.push(
        new Entry(i, `Text ${i}`, `Context ${i}`, `Translation ${i}`),
      );
    }
  }

  getEntries(sectionId: number) {
    this.entries = [];
    this.resetCurrentIndex();
    if (!sectionId) {
      return;
    }
    this.http
      .get<DbElementType[]>(`sections/${sectionId}/elements`)
      .subscribe((elements) => {
        elements.forEach((e) =>
          this.entries.push(new Entry(e.id, e.name, e.context, e.translation)),
        );
        this.resetCurrentIndex();
      });
  }

  goPrevious() {
    const nextIndex = Math.max(0, this.currentEntryIndex - 1);
    this.currentEntryIndex$.next(nextIndex);
  }

  goNext() {
    const nextIndex = this.currentEntryIndex + 1;
    if (nextIndex === this.entries.length) {
      this.currentTranslateIndex++;
      setTimeout(() => {
        alert('Done!');
      }, 10);
      return;
    }
    this.currentEntryIndex$.next(nextIndex);
  }

  resetCurrentIndex() {
    this.currentEntryIndex$.next(0);
  }

  goBegin() {
    this.resetCurrentIndex();
  }
}
