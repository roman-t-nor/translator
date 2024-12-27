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
export class MemorizeService {
  entries: StyledEntry[] = [];
  currentEntryIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentEntryIndex: number = 0;

  state: StateService = inject(StateService);
  http: HttpClient = inject(HttpClient);

  constructor(
    @Inject('isMemorizeServiceInTestMode') isMemorizeServiceInTestMode: boolean,
  ) {
    if (isMemorizeServiceInTestMode) {
      this.addTestEntries();
    }

    this.currentEntryIndex$.subscribe((index) => {
      this.currentEntryIndex = index;
      console.log(index);
    });

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
      });
  }

  goNext() {
    const nextIndex = this.currentEntryIndex + 1;
    if (nextIndex > this.entries.length) {
      alert('Done!');
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
