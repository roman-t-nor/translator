import { Component } from '@angular/core';
import { PopupService } from '@/services/popup.service';

@Component({
  selector: 'button-popup-save',
  standalone: true,
  templateUrl: 'button-popup.component.html',
  host: {
    '(click)': 'showPopup()',
  },
})
export class ButtonPopupSaveComponent {
  constructor(private popupService: PopupService) {}

  showPopup() {
    this.popupService.show();
  }
}