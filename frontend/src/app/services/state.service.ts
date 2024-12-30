import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DbSectionType } from '@/types/db';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  mode: 'Read' | 'Memo' = 'Read';

  sections: DbSectionType[] = [];
  sectionId$: Subject<number> = new Subject<number>();
  sectionId: number = 0;

  private http = inject(HttpClient);

  constructor() {
    this.sectionId$.subscribe((sectionId) => {
      this.sectionId = sectionId;
    });
  }

  toggleMode() {
    this.mode = this.isModeRead() ? 'Memo' : 'Read';
  }

  isModeRead() {
    return this.mode === 'Read';
  }

  getSections() {
    this.http
      .get<DbSectionType[]>('sections')
      .subscribe((dbSections) => (this.sections = dbSections));
  }
}
