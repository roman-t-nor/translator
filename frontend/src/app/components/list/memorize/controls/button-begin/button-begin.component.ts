import { Component } from '@angular/core';
import { MemorizeService } from '@/services/memorize.service';

@Component({
  selector: 'button-begin',
  standalone: true,
  templateUrl: 'button-begin.component.html',
  host: {
    '(click)': 'goBegin()',
  },
})
export class ButtonBeginComponent {
  constructor(private state: MemorizeService) {}

  goBegin() {
    this.state.goBegin();
  }
}
