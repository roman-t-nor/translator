import { Component } from '@angular/core';
import { StateService } from '@/services/state.service';
import { DbSectionType } from '@/types/db';

@Component({
  selector: 'sections',
  standalone: true,
  templateUrl: 'sections.component.html',
})
export class SectionsComponent {
  constructor(public state: StateService) {}

  get sections(): DbSectionType[] {
    return this.state.sections.map((s) => ({
      ...s,
      name: '&nbsp;'.repeat(s.depth * 3) + s.name,
    }));
  }

  setSectionId($event: Event) {
    const target = $event.target as HTMLSelectElement;
    this.state.sectionId$.next(Number(target.value));
  }
}
