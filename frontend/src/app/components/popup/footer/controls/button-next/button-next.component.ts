import { Component } from '@angular/core';
import { StateService } from '@/services/state.service';

@Component({
  selector: 'popup-button-next',
  standalone: true,
  templateUrl: 'button-next.component.html',
})
export class ButtonNextComponent {
  constructor(private state: StateService) {}

  goNext() {
    this.state.goNext();
  }
}
