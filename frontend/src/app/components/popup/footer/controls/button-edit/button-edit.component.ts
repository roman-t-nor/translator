import { Component } from '@angular/core';
import { StateService } from '@/services/state.service';
import { PopupService } from '@/services/popup.service';

@Component({
  selector: 'popup-button-edit',
  standalone: true,
  templateUrl: 'button-edit.component.html',
})
export class ButtonEditComponent {
  constructor(private popupService: PopupService) {}

  edit() {
    this.popupService.isInEditingMode$.next(true);
  }
}
