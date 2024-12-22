import { Component } from '@angular/core';
import { StateService } from '@/services/state.service';

@Component({
  selector: 'respect-list-groups',
  standalone: true,
  templateUrl: 'respect-list-groups.component.html',
})
export class RespectListGroupsComponent {
  constructor(private state: StateService) {}

  setRespectListGroups($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.state.respectListGroups = target.checked;
  }
}
