import { Inject, inject, Injectable } from '@angular/core';
import { Entry } from '@/Entry';
import { BehaviorSubject, Subject } from 'rxjs';
import { StateService } from '@/services/state.service';
import { HttpClient } from '@angular/common/http';
import { DbElementType } from '@/types/db';
import { PopupService } from '@/services/popup.service';

export type StyledEntry = Entry & { style?: { [key: string]: string } };

@Injectable({
  providedIn: 'root',
})
export class MemoService {
  entries: StyledEntry[] = [];
  entriesStrict: Entry[] = [];
  currentEntryIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentEntryIndex: number = 0;
  currentStrictEntryIndex: number = 0;
  currentTranslateIndex: number = -1;
  mode: 'weak' | 'strict' = 'weak';
  isWeakEntryShowed: boolean = false;
  currentEntry$: Subject<Entry>;

  state = inject(StateService);
  http = inject(HttpClient);
  popupService = inject(PopupService);

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

    this.popupService.isOpen$.subscribe((value) => {
      if (!value) {
        this.mode = 'weak';
      }
    });

    this.state.sectionId$.subscribe((sectionId) => this.getEntries(sectionId));
  }

  addTestEntries() {
    for (let i = 1; i <= 4; i++) {
      this.entries.push(
        new Entry(i, `Text ${i}`, `Context ${i}`, `Translation ${i}`),
      );
      this.entriesStrict.push(new Entry(i, `Text ${i}`));
      this.entriesStrict.push(
        new Entry(i, `Text ${i}`, `Context ${i}`, `Translation ${i}`),
      );
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
          this.entriesStrict.push(
            new Entry(e.id, e.name, e.context, e.translation),
          );
        });
        this.resetCurrentIndex();
        this.currentEntry$.next(this.entries[0]);
        this.isWeakEntryShowed = false;
      });
  }

  goPrevious() {
    if (!this.currentEntryIndex) {
      return;
    }
    this.currentStrictEntryIndex--;
    const nextIndex = this.currentEntryIndex - 1;
    if (this.mode === 'strict') {
      if (!this.isWeakEntryShowed) {
        this.currentEntryIndex$.next(nextIndex);
      }
      this.currentEntry$.next(this.entriesStrict[this.currentStrictEntryIndex]);

      this.isWeakEntryShowed = !this.isWeakEntryShowed;
    } else {
      this.currentEntryIndex$.next(nextIndex);
      this.currentEntry$.next(this.entries[nextIndex]);
    }
  }

  goNext() {
    if (this.mode === 'strict') {
      if (this.currentStrictEntryIndex === this.entriesStrict.length - 1) {
        alert('Done!');
        return;
      }
      this.currentStrictEntryIndex++;
      if (this.isWeakEntryShowed) {
        this.currentEntryIndex$.next(this.currentEntryIndex + 1);
      }
      this.currentEntry$.next(this.entriesStrict[this.currentStrictEntryIndex]);
      this.isWeakEntryShowed = !this.isWeakEntryShowed;
    } else {
      const nextIndex = this.currentEntryIndex + 1;
      if (nextIndex === this.entries.length) {
        this.currentTranslateIndex++;
        setTimeout(() => {
          alert('Done!');
        }, 10);
        return;
      }
      this.currentEntryIndex$.next(nextIndex);
      this.currentEntry$.next(this.entries[nextIndex]);
    }
  }

  resetCurrentIndex() {
    this.currentEntryIndex$.next(0);
    this.currentStrictEntryIndex = 0;
  }

  goBegin() {
    this.resetCurrentIndex();
  }
}
