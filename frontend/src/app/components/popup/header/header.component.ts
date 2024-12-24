import { Component } from '@angular/core';
import { StatsComponent } from './stats.component';
import { PopupService } from '@/services/popup.service';
import { StateService } from '@/services/state.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'popup-header',
  standalone: true,
  templateUrl: 'header.component.html',
  imports: [StatsComponent, AsyncPipe],
})
export class HeaderComponent {
  constructor(
    private state: StateService,
    private popupService: PopupService,
  ) {}

  get isInSavingMode() {
    return this.popupService.isInSavingMode$;
  }

  get text() {
    return this.state.currentEntry.text;
  }
}
