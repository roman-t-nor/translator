import { Component } from '@angular/core';
import { StateService } from '@/services/state.service';

@Component({
  selector: 'button-next',
  standalone: true,
  templateUrl: 'button-next.component.html',
  host: {
    '(click)': 'goNext()',
  },
})
export class ButtonNextComponent {
  constructor(private state: StateService) {}
  goNext() {
    this.state.goNext();
  }
}
