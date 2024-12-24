import { Component } from '@angular/core';
import { StateService } from '@/services/state.service';
import { PopupService } from '@/services/popup.service';

@Component({
  selector: 'popup-button-save',
  standalone: true,
  templateUrl: 'button-save.component.html',
})
export class ButtonSaveComponent {
  constructor(
    private state: StateService,
    private popupService: PopupService,
  ) {}

  save() {
    this.state.refreshEntries();
    this.popupService.isInEditingMode$.next(false);
  }
}
