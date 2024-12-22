export type LanguageFromType = 'NB' | 'EN';

export type LanguageToType = 'EN-US' | 'RU';

export type SettingsLanguagesType = {
  from: LanguageFromType;
  to: LanguageToType[];
};
