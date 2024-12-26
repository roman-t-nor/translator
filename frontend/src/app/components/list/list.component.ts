import { Component } from '@angular/core';
import { StateService } from '@/services/state.service';
import { ListMemorizeComponent } from '@/components/list/memorize/list-memorize.component';
import { ListReadComponent } from '@/components/list/read/list-read.component';

@Component({
  selector: 'list',
  standalone: true,
  imports: [ListReadComponent, ListMemorizeComponent],
  templateUrl: './list.component.html',
})
export class ListComponent {
  constructor(public state: StateService) {}
}
