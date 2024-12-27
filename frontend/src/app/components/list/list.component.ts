import { Component } from '@angular/core';
import { StateService } from '@/services/state.service';
import { ListMemoComponent } from '@/components/list/memo/list-memo.component';
import { ListReadComponent } from '@/components/list/read/list-read.component';

@Component({
  selector: 'list',
  standalone: true,
  imports: [ListReadComponent, ListMemoComponent],
  templateUrl: './list.component.html',
})
export class ListComponent {
  constructor(public state: StateService) {}
}
