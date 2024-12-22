import { Component } from '@angular/core';
import { StateService } from '@/services/state.service';

@Component({
  selector: 'button-translate',
  standalone: true,
  templateUrl: 'button-translate.component.html',
  host: {
    '(click)': 'translate()',
  },
})
export class ButtonTranslateComponent {
  constructor(private state: StateService) {}

  translate() {
    this.state.translate();
  }
}
