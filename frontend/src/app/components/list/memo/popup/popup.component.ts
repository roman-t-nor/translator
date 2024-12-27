import { Component } from '@angular/core';
import { PopupComponent } from '@/components/popup/popup.component';
import { HeaderMemoComponent } from '@/components/list/memo/popup/header/header.component';
import { HeaderReadComponent } from '@/components/list/read/popup/header/header.component';

@Component({
  selector: 'popup-memo',
  standalone: true,
  imports: [PopupComponent, HeaderMemoComponent, HeaderReadComponent],
  templateUrl: './popup.component.html',
})
export class PopupMemoComponent {}
