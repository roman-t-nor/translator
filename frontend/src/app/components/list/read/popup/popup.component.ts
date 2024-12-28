import { Component, inject } from '@angular/core';
import { PopupComponent } from '@/components/popup/popup.component';
import { PopupHeaderReadComponent } from '@/components/list/read/popup/header/header.component';
import { FormService } from '@/services/form.service';
import { PopupBodyReadComponent } from '@/components/list/read/popup/body/body.component';
import { PopupFooterReadComponent } from '@/components/list/read/popup/footer/footer.component';

@Component({
  selector: 'popup-read',
  standalone: true,
  imports: [
    PopupComponent,
    PopupHeaderReadComponent,
    PopupBodyReadComponent,
    PopupFooterReadComponent,
  ],
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
