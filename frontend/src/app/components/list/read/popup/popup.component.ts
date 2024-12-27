import { Component, inject } from '@angular/core';
import { PopupComponent } from '@/components/popup/popup.component';
import { HeaderReadComponent } from '@/components/list/read/popup/header/header.component';
import { FormService } from '@/services/form.service';

@Component({
  selector: 'popup-read',
  standalone: true,
  imports: [PopupComponent, HeaderReadComponent],
  templateUrl: './popup.component.html',
})
export class PopupReadComponent {
  formService = inject(FormService);

  constructor() {
    window.addEventListener('mouseup', (event: MouseEvent) => {
      this.formService.handleMouseUp(event);
    });
  }
}
