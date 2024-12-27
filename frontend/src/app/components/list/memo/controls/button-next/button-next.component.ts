import { Component } from '@angular/core';
import { MemoService } from '@/services/memo.service';

@Component({
  selector: 'button-next',
  standalone: true,
  templateUrl: 'button-next.component.html',
  host: {
    '(click)': 'goNext()',
  },
})
export class ButtonNextComponent {
  constructor(private state: MemoService) {}

  goNext() {
    this.state.goNext();
  }
}
