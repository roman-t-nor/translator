import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from '@/services/state.service';
import { DbSectionType } from '@/types/db';

type SectionType = {
  id: number;
  title: string;
};

@Component({
  selector: 'sections',
  standalone: true,
  templateUrl: 'sections.component.html',
})
export class SectionsComponent {
  constructor(
    public state: StateService,
    private http: HttpClient,
  ) {
    this.getSections();
  }

  sections: SectionType[] = [];

  getSections() {
    this.http.get<DbSectionType[]>('sections').subscribe((dbSections) => {
      dbSections.forEach((dbSection: DbSectionType) => {
        this.sections.push({
          id: dbSection.id,
          title: this.formatTitle(dbSection.name, dbSection.depth),
        });
      });
    });
  }

  formatTitle(title: string, depth: number) {
    return '&nbsp;'.repeat(depth * 3) + title;
  }

  setSectionId($event: Event) {
    const target = $event.target as HTMLSelectElement;
    this.state.sectionId = Number(target.value);
  }
}
