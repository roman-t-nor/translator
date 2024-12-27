import { Component } from '@angular/core';
import { MemorizeService, StyledEntry } from '@/services/memorize.service';
import { ControlsComponent } from '@/components/list/memorize/controls/controls.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { PopupMemorizeComponent } from '@/components/list/memorize/popup/popup.component';

@Component({
  selector: 'list-memorize',
  standalone: true,
  templateUrl: './list-memorize.component.html',
  styles: '.animating .item {font-weight: normal !important;}',
  imports: [ControlsComponent, AsyncPipe, NgIf, PopupMemorizeComponent],
})
export class ListMemorizeComponent {
  constructor(public state: MemorizeService) {}

  get entries(): StyledEntry[] {
    return this.state.entries;
  }
}
