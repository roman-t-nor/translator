import { Component } from '@angular/core';
import { MemoService } from '@/services/memo.service';

@Component({
  selector: 'button-begin',
  standalone: true,
  templateUrl: 'button-begin.component.html',
  host: {
    '(click)': 'goBegin()',
  },
})
export class ButtonBeginComponent {
  constructor(private state: MemoService) {}

  goBegin() {
    this.state.goBegin();
  }
}
