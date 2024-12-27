import { Component } from '@angular/core';
import { Entry } from '@/Entry';
import { ItemComponent } from './item/item.component';
import { ControlsComponent } from './controls/controls.component';
import { PopupReadComponent } from '@/components/list/read/popup/popup.component';
import { ReadService } from '@/services/read.service';

@Component({
  selector: 'list-read',
  standalone: true,
  imports: [ItemComponent, ControlsComponent, PopupReadComponent],
  templateUrl: './list-read.component.html',
  styles: ':host{display: flex;flex-direction: column;flex-grow: 1;}',
})
export class ListReadComponent {
  constructor(private readService: ReadService) {}

  get entries(): Entry[] {
    return this.readService.entries;
  }

  get isEntriesLoaded(): boolean {
    return !!this.entries.length;
  }
}
