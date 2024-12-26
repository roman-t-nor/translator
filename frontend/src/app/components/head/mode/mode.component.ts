import { Component, inject } from '@angular/core';
import { StateService } from '@/services/state.service';

@Component({
  selector: 'app-mode',
  standalone: true,
  templateUrl: 'mode.component.html',
  styleUrl: 'mode.component.css',
})
export class ModeComponent {
  state = inject(StateService);

  get title(): 'Read' | 'Memorize' {
    return this.state.mode;
  }

  toggle() {
    this.state.toggleMode();
  }

  get isMemorize() {
    return this.state.mode === 'Memorize';
  }
}
