import { Inject, inject, Injectable } from '@angular/core';
import { Entry } from '@/Entry';
import { BehaviorSubject, Subject } from 'rxjs';
import { StateService } from '@/services/state.service';
import { HttpClient } from '@angular/common/http';
import { DbElementType } from '@/types/db';

export type StyledEntry = Entry & { style?: { [key: string]: string } };

@Injectable({
  providedIn: 'root',
})
export class MemoService {
  entries: StyledEntry[] = [];
  entriesStrict: Entry[] = [];
  currentEntryIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentEntryIndex: number = 0;
  currentTranslateIndex: number = -1;
  mode: 'weak' | 'strict' = 'weak';
  isWeakEntryShowed: boolean = false;
  currentEntry$: Subject<Entry>;

  state: StateService = inject(StateService);
  http: HttpClient = inject(HttpClient);

  constructor(
    @Inject('isMemoServiceInTestMode') isMemoServiceInTestMode: boolean,
  ) {
    if (isMemoServiceInTestMode) {
      this.addTestEntries();
    }
    this.currentEntry$ = new Subject<Entry>();

    this.currentEntryIndex$.subscribe((index) => {
      this.currentEntryIndex = index;
      this.currentTranslateIndex = index - 1;
    });

    this.state.sectionId$.subscribe((sectionId) => this.getEntries(sectionId));
  }

  addTestEntries() {
    for (let i = 1; i <= 4; i++) {
      this.entries.push(
        new Entry(i, `Text ${i}`, `Context ${i}`, `Translation ${i}`),
      );
      this.entriesStrict.push(new Entry(i, `Text ${i}`));
    }
  }

  getEntries(sectionId: number) {
    this.entries = [];
    this.entriesStrict = [];
    this.resetCurrentIndex();
    if (!sectionId) {
      return;
    }
    this.http
      .get<DbElementType[]>(`sections/${sectionId}/elements`)
      .subscribe((elements) => {
        elements.forEach((e) => {
          this.entries.push(new Entry(e.id, e.name, e.context, e.translation));
          this.entriesStrict.push(new Entry(e.id, e.name, '', ''));
        });
        this.resetCurrentIndex();
        this.currentEntry$.next(this.entries[0]);
        this.isWeakEntryShowed = false;
      });
  }

  goPrevious() {
    const nextIndex = Math.max(0, this.currentEntryIndex - 1);
    if (this.mode === 'weak') {
      this.currentEntryIndex$.next(nextIndex);
      this.currentEntry$.next(this.entries[nextIndex]);
    } else {
      if (this.isWeakEntryShowed) {
        this.currentEntry$.next(this.entriesStrict[this.currentEntryIndex]);
      } else {
        this.currentEntryIndex$.next(nextIndex);
        this.currentEntry$.next(this.entries[nextIndex]);
      }
      this.isWeakEntryShowed = !this.isWeakEntryShowed;
    }
  }

  goNext() {
    if (this.mode === 'weak' || this.isWeakEntryShowed) {
      const nextIndex = this.currentEntryIndex + 1;
      if (nextIndex === this.entries.length) {
        this.currentTranslateIndex++;
        setTimeout(() => {
          alert('Done!');
        }, 10);
        return;
      }
      this.currentEntryIndex$.next(nextIndex);
      if (this.mode === 'strict') {
        this.currentEntry$.next(this.entriesStrict[nextIndex]);
      } else {
        this.currentEntry$.next(this.entries[nextIndex]);
      }
    } else {
      this.currentEntry$.next(this.entries[this.currentEntryIndex]);
    }

    if (this.mode === 'strict') {
      this.isWeakEntryShowed = !this.isWeakEntryShowed;
    }
  }

  resetCurrentIndex() {
    this.currentEntryIndex$.next(0);
  }

  goBegin() {
    this.resetCurrentIndex();
  }
}
