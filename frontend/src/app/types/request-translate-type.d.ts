import { Entry } from '@/Entry';
import { LanguageFromType, LanguageToType } from './languages';
import { Observable } from 'rxjs';

export type RequestTranslateType = (
  entry: Entry,
  languageFrom: LanguageFromType,
  languageTo: LanguageToType,
) => Observable<string>;
