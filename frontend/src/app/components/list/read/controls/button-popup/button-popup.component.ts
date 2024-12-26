import { Component } from '@angular/core';
import { PopupService } from '@/services/popup.service';

@Component({
  selector: 'button-popup',
  standalone: true,
  templateUrl: 'button-popup.component.html',
  host: {
    '(click)': 'showPopup()',
  },
})
export class ButtonPopupComponent {
  constructor(private popupService: PopupService) {}

  showPopup() {
    this.popupService.show();
  }
}
