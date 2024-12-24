import { Inject, Injectable } from '@angular/core';
import { Entry } from '@/Entry';
import { BehaviorSubject, Subject, zip } from 'rxjs';
import { StateService } from '@/services/state.service';
import { HelperService } from '@/services/helper.service';
import { TranslateService } from '@/services/translate/translate.service';
import { LanguageToType } from '@/types/languages';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  entries: Entry[] = [];
  isEntriesExist$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  currentEntryIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  currentEntry: Entry = this.entries[0];
  isFormEntryTranslating: boolean = false;
  selectedContentToCopyToTranslation$: Subject<string> = new Subject<string>();

  constructor(
    private state: StateService,
    private helper: HelperService,
    private translator: TranslateService,
    @Inject('isGetEntriesInTestMode') private isGetEntriesInTestMode: boolean,
  ) {
    if (isGetEntriesInTestMode) {
      this.entries = [
        new Entry(1, 'trikken'),
        new Entry(2, 'Text 2'),
        new Entry(3, 'Text 3'),
      ];
      this.entries[0].translations.push('translation 1');
      this.entries[0].translations.push('translation 2');
    }

    this.state.currentEntryIndex$.subscribe(() => (this.entries = []));
    this.currentEntryIndex$.subscribe(
      (currentEntryIndex) =>
        (this.currentEntry = this.entries[currentEntryIndex]),
    );
  }

  handleMouseUp(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      !target ||
      !(
        target.classList.contains('translate-on-select') ||
        target.classList.contains('copy-to-translations-on-select')
      )
    ) {
      return;
    }

    const windowSelection = window.getSelection();
    if (!windowSelection) {
      return;
    }
    const selectedContent = windowSelection.toString().trim().toLowerCase();
    if (!selectedContent || selectedContent.length === 1) {
      return;
    }

    if (target.classList.contains('translate-on-select')) {
      this.translateOnSelect(selectedContent);
    } else {
      this.copyToTranslationsOnSelect(selectedContent);
    }
  }

  translateOnSelect(selectedContent: string) {
    const isDoubleExist = this.entries.some(
      (entry: Entry) => entry.text === selectedContent,
    );
    const isSelectedWholeText =
      selectedContent === this.state.currentEntry.text.toLowerCase();

    if (isDoubleExist || isSelectedWholeText) {
      return;
    }

    const entry = new Entry(
      this.helper.hashCode(selectedContent),
      selectedContent,
      this.state.currentEntry.text,
    );

    if (this.isFormEntryTranslating) {
      return;
    }
    this.isFormEntryTranslating = true;

    this.entries.push(entry);
    this.isEntriesExist$.next(true);
    this.currentEntryIndex$.next(this.currentEntryIndex$.getValue() + 1);

    const languagesTo = [...this.state.settingsLanguages.to];
    if (languagesTo.length === 2 && languagesTo[0] !== 'RU') {
      languagesTo.reverse();
    }
    zip(
      languagesTo.map((languageTo: LanguageToType) => {
        return this.translator.translate(
          entry,
          this.state.settingsLanguages.from,
          languageTo,
        );
      }),
    ).subscribe((translations: string[]) => {
      translations.forEach((translation: string) => {
        entry.translations.push(translation.toLowerCase());
      });
    });

    this.isFormEntryTranslating = false;
  }

  copyToTranslationsOnSelect(selectedContent: string) {
    if (!this.entries.length) {
      return;
    }
    this.selectedContentToCopyToTranslation$.next(selectedContent);
  }

  removeEntry(index: number) {
    const currentEntriesMaxIndex = this.entries.length - 1;
    this.entries.splice(index, 1);
    const newIndex = currentEntriesMaxIndex - 1;
    this.currentEntryIndex$.next(Math.max(0, newIndex));
    if (!this.entries.length) {
      this.isEntriesExist$.next(false);
    }
  }

  removeAllEntries() {
    this.entries = [];
    this.isEntriesExist$.next(false);
  }
}
