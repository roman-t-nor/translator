import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ReadService } from '@/services/read.service';
import { StatsComponent } from '@/components/stats/stats.component';

@Component({
  selector: 'popup-header-read',
  standalone: true,
  templateUrl: 'header.component.html',
  imports: [AsyncPipe, StatsComponent],
})
export class PopupHeaderReadComponent {
  constructor(public readService: ReadService) {}

  get isInSavingMode() {
    return this.readService.isInSavingMode$;
  }

  get text() {
    return this.readService.currentEntry.text;
  }
}
