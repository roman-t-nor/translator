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
    const formData = new FormData();
    formData.set('action', 'translate');
    formData.set('text', entry.text);
    formData.set('languageFrom', languageFrom);
    formData.set('languageTo', languageTo);
    formData.set('context', entry.context);

    return this.http.get<string>('translate', {
      params: {
        text: entry.text,
        languageFrom,
        languageTo,
        context: entry.context,
      },
    });
  }
}
