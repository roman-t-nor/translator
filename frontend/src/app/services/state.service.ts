import { Injectable } from '@angular/core';
import { Entry } from '@/Entry';
import { TranslateService } from './translate/translate.service';
import { SettingsLanguagesType } from '@/types/languages';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  entries: Entry[] = [];
  currentEntryIndex$: Subject<number> = new Subject<number>();
  currentEntryIndex: number = 0;
  currentEntry: Entry = this.entries[0];

  sectionId: number = 0;
  settingsLanguages!: SettingsLanguagesType;

  respectListGroups: boolean = false;
  fileName?: string;
  private $isTranslating: boolean = false;

  constructor(private translator: TranslateService) {
    this.currentEntryIndex$.subscribe((currentEntryIndex) => {
      this.currentEntryIndex = currentEntryIndex;
      this.currentEntry = this.entries[currentEntryIndex];
      if (this.fileName) {
        localStorage.setItem(this.fileName, currentEntryIndex.toString());
      }
    });
  }

  get isTranslating() {
    return this.$isTranslating;
  }

  setCurrentEntry(index: number) {
    this.currentEntryIndex$.next(index);
  }

  goPrevious() {
    const newIndex = Math.max(0, this.currentEntryIndex - 1);
    if (newIndex === this.currentEntryIndex) {
      return;
    }
    this.currentEntryIndex$.next(newIndex);
  }

  goNext() {
    const newIndex = Math.min(
      this.entries.length - 1,
      this.currentEntryIndex + 1,
    );
    if (newIndex === this.currentEntryIndex) {
      return;
    }
    this.currentEntryIndex$.next(newIndex);
  }

  setIsTranslatingFlag() {
    this.$isTranslating = true;
  }

  removeIsTranslatingFlag() {
    this.$isTranslating = false;
  }

  translate() {
    const doneTranslationsCount = this.currentEntry.translations.length;
    const settingsLanguagesToCount = this.settingsLanguages.to.length;
    if (doneTranslationsCount >= settingsLanguagesToCount) {
      return;
    }
    const languageFrom = this.settingsLanguages.from;
    const languageTo = this.settingsLanguages.to[doneTranslationsCount];

    this.setIsTranslatingFlag();
    this.translator
      .translate(this.currentEntry, languageFrom, languageTo)
      .subscribe({
        next: (translation) => {
          this.currentEntry.translations.push(translation);
        },
        complete: () => {
          this.removeIsTranslatingFlag();
        },
        error: () => {
          this.removeIsTranslatingFlag();
        },
      });
  }
}
