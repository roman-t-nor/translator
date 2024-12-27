import { Component } from '@angular/core';
import { ReadService } from '@/services/read.service';

@Component({
  selector: 'respect-list-groups',
  standalone: true,
  templateUrl: 'respect-list-groups.component.html',
})
export class RespectListGroupsComponent {
  constructor(private readService: ReadService) {}

  setRespectListGroups($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.readService.respectListGroups = target.checked;
  }
}
