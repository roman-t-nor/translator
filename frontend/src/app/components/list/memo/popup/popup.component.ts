import { Component } from '@angular/core';
import { PopupComponent } from '@/components/popup/popup.component';

@Component({
  selector: 'popup-memo',
  standalone: true,
  imports: [PopupComponent],
  templateUrl: './popup.component.html',
})
export class PopupMemoComponent {}
