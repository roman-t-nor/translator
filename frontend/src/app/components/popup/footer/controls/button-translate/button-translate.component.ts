import { Component } from '@angular/core';
import { StateService } from '@/services/state.service';

@Component({
  selector: 'popup-button-translate',
  standalone: true,
  templateUrl: 'button-translate.component.html',
})
export class ButtonTranslateComponent {
  constructor(private state: StateService) {}

  translate() {
    this.state.translate();
  }
}
