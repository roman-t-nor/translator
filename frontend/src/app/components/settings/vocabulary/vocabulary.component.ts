import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from '@/services/state.service';

type DbVocabularyType = {
  ID: string;
  DEPTH_LEVEL: string;
  NAME: string;
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
    const formData = new FormData();
    formData.set('action', 'get_vocabularies_sections');

    this.http
      .post<DbVocabularyType[]>('', formData)
      .subscribe((dbVocabularies) => {
        dbVocabularies.forEach((dbVocabulary: DbVocabularyType) => {
          this.vocabularies.push({
            id: Number(dbVocabulary.ID),
            title: this.formatTitle(
              dbVocabulary.NAME,
              dbVocabulary.DEPTH_LEVEL,
            ),
          });
        });
      });
  }

  formatTitle(title: string, level: string) {
    return '&nbsp;'.repeat(Number(level)) + title;
  }

  setVocabularyId($event: Event) {
    const target = $event.target as HTMLSelectElement;
    this.state.vocabularyId = Number(target.value);
  }
}
