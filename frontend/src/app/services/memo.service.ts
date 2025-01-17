import { Inject, inject, Injectable } from '@angular/core';
import { Entry } from '@/Entry';
import { BehaviorSubject } from 'rxjs';
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
  currentEntryIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentEntryIndex: number = 0;
  currentEntry: Entry;
  currentTranslateIndex: number = -1;
  mode: 'weak' | 'strict' = 'weak';
  isShowInWeakMode: boolean = true;

  state = inject(StateService);
  http = inject(HttpClient);
  popupService = inject(PopupService);
  isShowMemoPopup = false;
  isShowEditPopup = false;
  isShowShowPopup = false;
  isShowListInStrictMode: boolean = true;

  constructor(
    @Inject('isMemoServiceInTestMode') isMemoServiceInTestMode: boolean,
  ) {
    if (isMemoServiceInTestMode) {
      this.addTestEntries();
    }

    this.currentEntryIndex$.subscribe((index) => {
      this.currentEntryIndex = index;
      this.currentTranslateIndex = index - 1;
      this.currentEntry = this.entries[index];
    });

    this.popupService.isOpen$.subscribe((value) => {
      if (!value) {
        this.mode = 'weak';
        this.isShowMemoPopup = false;
        this.isShowEditPopup = false;
        this.isShowShowPopup = false;
      }
    });

    this.state.sectionId$.subscribe((sectionId) => {
      this.getEntries(sectionId);
      this.resetCurrentIndex();
    });

    this.currentEntry = this.entries[0];
  }

  addTestEntries() {
    for (let i = 1; i <= 20; i++) {
      this.entries.push(
        new Entry(i, `Text ${i}`, `Context ${i}`, `Translation ${i}`),
      );
    }
  }

  getEntries(sectionId?: number) {
    const sId = sectionId ?? this.state.sectionId;
    if (!sId) {
      return;
    }
    this.http
      .get<DbElementType[]>(`sections/${sId}/elements`)
      .subscribe((elements) => {
        this.entries = [];
        elements.forEach((e) => {
          this.entries.push(new Entry(e.id, e.name, e.context, e.translation));
        });
        this.currentEntry = this.entries[this.currentEntryIndex];
      });
  }

  goPrevious() {
    if (!this.currentEntryIndex) {
      return;
    }
    const nextIndex = this.currentEntryIndex - 1;
    if (this.mode === 'weak' || !this.isShowInWeakMode) {
      this.currentEntryIndex$.next(nextIndex);
    }
    if (this.mode === 'strict') {
      this.isShowInWeakMode = !this.isShowInWeakMode;
    }
  }

  goNext() {
    const nextIndex = this.currentEntryIndex + 1;
    if (nextIndex === this.entries.length) {
      this.currentTranslateIndex++;
      this.isShowInWeakMode = true;
      setTimeout(() => {
        alert('Done!');
      }, 250);
      return;
    }

    if (this.mode === 'weak' || this.isShowInWeakMode) {
      this.currentEntryIndex$.next(nextIndex);
    }
    if (this.mode === 'strict') {
      this.isShowInWeakMode = !this.isShowInWeakMode;
    }
  }

  resetCurrentIndex() {
    this.currentEntryIndex$.next(0);
  }

  goBegin() {
    this.resetCurrentIndex();
  }
}
