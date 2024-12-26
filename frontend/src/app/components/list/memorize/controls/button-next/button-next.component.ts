import { Component } from '@angular/core';
import { MemorizeService } from '@/services/memorize.service';

@Component({
  selector: 'button-next',
  standalone: true,
  templateUrl: 'button-next.component.html',
  host: {
    '(click)': 'goNext()',
  },
})
export class ButtonNextComponent {
  constructor(private state: MemorizeService) {}

  goNext() {
    this.state.goNext();
  }
}
