import { Component } from '@angular/core';
import { PopupComponent } from '@/components/popup/popup.component';
import { HeaderMemoComponent } from '@/components/list/memo/popup/header/header.component';

@Component({
  selector: 'popup-memo',
  standalone: true,
  imports: [PopupComponent, HeaderMemoComponent],
  templateUrl: './popup.component.html',
})
export class PopupMemoComponent {}
