import { Component } from '@angular/core';
import { Entry } from '@/Entry';
import { ItemComponent } from './item/item.component';
import { StateService } from '@/services/state.service';
import { ControlsComponent } from './controls/controls.component';
import { PopupReadComponent } from '@/components/list/read/popup/popup.component';

@Component({
  selector: 'list-read',
  standalone: true,
  imports: [ItemComponent, ControlsComponent, PopupReadComponent],
  templateUrl: './list-read.component.html',
  styles: ':host{display: flex;flex-direction: column;flex-grow: 1;}',
})
export class ListReadComponent {
  constructor(private state: StateService) {}

  get entries(): Entry[] {
    return this.state.entries;
  }

  get isEntriesLoaded(): boolean {
    return !!this.entries.length;
  }
}
