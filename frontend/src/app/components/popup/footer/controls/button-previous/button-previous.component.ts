import { Component } from '@angular/core';
import { StateService } from '@/services/state.service';

@Component({
  selector: 'popup-button-previous',
  standalone: true,
  templateUrl: 'button-previous.component.html',
})
export class ButtonPreviousComponent {
  constructor(private state: StateService) {}

  goPrevious() {
    this.state.goPrevious();
  }
}
