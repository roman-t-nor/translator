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
}
