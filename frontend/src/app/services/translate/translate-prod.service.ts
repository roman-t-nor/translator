import { inject, Injectable } from '@angular/core';
import { TranslateService } from './translate.service';
import { Observable } from 'rxjs';
import { Entry } from '@/Entry';
import { LanguageFromType, LanguageToType } from '@/types/languages';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TranslateProdService extends TranslateService {
  http = inject(HttpClient);

  translate(
    entry: Entry,
    languageFrom: LanguageFromType,
    languageTo: LanguageToType,
  ): Observable<string> {
    return this.http.get('translate', {
      params: {
        text: entry.text,
        languageFrom,
        languageTo,
        context: entry.context,
      },
      responseType: 'text',
    });
  }
}
