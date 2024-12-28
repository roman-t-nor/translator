import { Component } from '@angular/core';
import { ReadService } from '@/services/read.service';

@Component({
  selector: 'popup-button-next',
  standalone: true,
  templateUrl: 'button-next.component.html',
})
export class ButtonNextComponent {
  constructor(private readService: ReadService) {}

  goNext() {
    this.readService.goNext();
  }
}
