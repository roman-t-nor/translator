import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from '@/services/state.service';

type DbVocabularyType = {
  id: number;
  depth: number;
  name: string;
};

type VocabularyType = {
  id: number;
  title: string;
};

@Component({
  selector: 'vocabulary',
  standalone: true,
  templateUrl: 'vocabulary.component.html',
})
export class VocabularyComponent {
  vocabularies: VocabularyType[] = [];

  constructor(
    private http: HttpClient,
    private state: StateService,
  ) {
    this.getVocabularies();
  }

  getVocabularies() {
    this.http
      .get<DbVocabularyType[]>('sections')
      .subscribe((dbVocabularies) => {
        dbVocabularies.forEach((dbVocabulary: DbVocabularyType) => {
          this.vocabularies.push({
            id: dbVocabulary.id,
            title: this.formatTitle(dbVocabulary.name, dbVocabulary.depth),
          });
        });
      });
  }

  formatTitle(title: string, depth: number) {
    return '&nbsp;'.repeat(depth * 3) + title;
  }

  setVocabularyId($event: Event) {
    const target = $event.target as HTMLSelectElement;
    this.state.vocabularyId = Number(target.value);
  }
}
