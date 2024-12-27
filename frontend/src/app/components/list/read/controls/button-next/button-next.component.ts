import { Component } from '@angular/core';
import { ReadService } from '@/services/read.service';

@Component({
  selector: 'button-next',
  standalone: true,
  templateUrl: 'button-next.component.html',
  host: {
    '(click)': 'goNext()',
  },
})
export class ButtonNextComponent {
  constructor(private readService: ReadService) {}

  goNext() {
    this.readService.goNext();
  }
}
