import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ReadService } from '@/services/read.service';
import { StatsComponent } from '@/components/stats/stats.component';

@Component({
  selector: 'popup-header-read',
  standalone: true,
  templateUrl: 'header.component.html',
  imports: [AsyncPipe, StatsComponent],
  styles: ':host{width: 100%}',
})
export class PopupHeaderReadComponent {
  constructor(public state: ReadService) {}

  get isInSavingMode() {
    return this.state.isInSavingMode$;
  }

  get text() {
    return this.state.currentEntry.text;
  }
}
