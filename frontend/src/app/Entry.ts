export class Entry {
  id: number;
  text: string;
  context: string = '';
  translations: string[] = [];
  lastInGroup: boolean = false;

  constructor(id: number, text: string, context = '') {
    this.id = id;
    this.text = text;
    this.context = context;
  }
}
