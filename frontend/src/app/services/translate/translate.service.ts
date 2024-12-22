import { Injectable } from '@angular/core';
import { Entry } from '@/Entry';
import { LanguageFromType, LanguageToType } from '@/types/languages';
import { Observable } from 'rxjs';

@Injectable()
export abstract class TranslateService {
  abstract translate(
    entry: Entry,
    languageFrom: LanguageFromType,
    languageTo: LanguageToType,
  ): Observable<string>;
}
