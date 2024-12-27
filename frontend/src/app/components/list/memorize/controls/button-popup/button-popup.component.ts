import { Component } from '@angular/core';
import { PopupService } from '@/services/popup.service';

@Component({
  selector: 'button-popup-memo',
  standalone: true,
  templateUrl: 'button-popup.component.html',
  host: {
    '(click)': 'showPopup()',
  },
})
export class ButtonPopupMemoComponent {
  constructor(private popupService: PopupService) {}

  showPopup() {
    this.popupService.show();
  }
}
