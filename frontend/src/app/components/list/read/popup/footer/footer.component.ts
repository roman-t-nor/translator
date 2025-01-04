import { Component } from '@angular/core';
import { ButtonTranslateComponent } from './controls/button-translate/button-translate.component';
import { ButtonPreviousComponent } from './controls/button-previous/button-previous.component';
import { ButtonNextComponent } from './controls/button-next/button-next.component';
import { ReadService } from '@/services/read.service';

@Component({
  selector: 'popup-footer-read',
  standalone: true,
  templateUrl: 'footer.component.html',
  imports: [
    ButtonTranslateComponent,
    ButtonPreviousComponent,
    ButtonNextComponent,
  ],
})
export class PopupFooterReadComponent {
  constructor(private state: ReadService) {}

  goPrevious() {
    this.state.goPrevious();
  }

  translate() {
    this.state.translate();
  }

  goNext() {
    this.state.goNext();
  }
}
