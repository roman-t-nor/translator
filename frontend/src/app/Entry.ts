export class Entry {
  id: number;
  text: string;
  context: string = '';
  translations: string[] = [];
  lastInGroup: boolean = false;

  constructor(
    id: number,
    text: string,
    context: string = '',
    translations: string | string[] = [],
  ) {
    this.id = id;
    this.text = text;
    this.context = context;

    if (Array.isArray(translations)) {
      this.translations = translations;
    } else {
      this.translations.push(translations);
    }
  }
}
