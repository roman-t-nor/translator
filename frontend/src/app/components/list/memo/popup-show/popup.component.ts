import { Component, Input } from '@angular/core';
import { PopupComponent } from '@/components/popup/popup.component';
import { Entry } from '@/Entry';

@Component({
  selector: 'popup-show',
  standalone: true,
  imports: [PopupComponent],
  templateUrl: './popup.component.html',
})
export class PopupMemoShowComponent {
  @Input() entry!: Entry;
}
