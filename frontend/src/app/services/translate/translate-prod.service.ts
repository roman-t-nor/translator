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
    const fd = new FormData();
    fd.set('text', entry.text);
    fd.set('languageFrom', languageFrom);
    fd.set('languageTo', languageTo);
    fd.set('context', entry.context);
    return this.http.post('translate', fd, { responseType: 'text' });
  }
}
