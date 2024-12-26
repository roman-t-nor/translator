import { Component } from '@angular/core';
import { Entry } from '@/Entry';
import { MemorizeService } from '@/services/memorize.service';
import { ControlsComponent } from '@/components/list/memorize/controls/controls.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'list-memorize',
  standalone: true,
  templateUrl: './list-memorize.component.html',
  imports: [ControlsComponent, AsyncPipe],
})
export class ListMemorizeComponent {
  constructor(public state: MemorizeService) {}

  get entries(): Entry[] {
    return this.state.entries;
  }
}
