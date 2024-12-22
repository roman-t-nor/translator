import { Injectable } from '@angular/core';
import { TranslateService } from './translate.service';
import { delay, Observable, of } from 'rxjs';
import { Entry } from '@/Entry';
import { LanguageFromType, LanguageToType } from '@/types/languages';

@Injectable()
export class TranslateTestService extends TranslateService {
  translate(
    entry: Entry,
    languageFrom: LanguageFromType,
    languageTo: LanguageToType,
  ): Observable<string> {
    const text = this.getText(entry, languageFrom, languageTo);
    return of(text).pipe(delay(800));
  }

  private getText(
    entry: Entry,
    languageFrom: LanguageFromType,
    languageTo: LanguageToType,
  ): string {
    const date = new Date();
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    const text = [`${h}:${m}:${s}`];
    text.push(`from: '${languageFrom}'`);
    text.push(`to: '${languageTo}'`);
    text.push(`${entry.text}`);

    return text.join(' - ');
  }
}
