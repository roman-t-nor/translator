import { Component } from '@angular/core';
import { MemoService, StyledEntry } from '@/services/memo.service';
import { ControlsComponent } from '@/components/list/memo/controls/controls.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { PopupMemoComponent } from '@/components/list/memo/popup/popup.component';

@Component({
  selector: 'list-memo',
  standalone: true,
  templateUrl: './list-memo.component.html',
  styles: '.animating .item {font-weight: normal !important;}',
  imports: [ControlsComponent, AsyncPipe, NgIf, PopupMemoComponent],
})
export class ListMemoComponent {
  constructor(public state: MemoService) {}

  get entries(): StyledEntry[] {
    return this.state.entries;
  }
}
