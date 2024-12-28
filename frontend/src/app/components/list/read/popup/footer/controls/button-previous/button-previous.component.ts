import { Component } from '@angular/core';
import { ReadService } from '@/services/read.service';

@Component({
  selector: 'popup-button-previous',
  standalone: true,
  templateUrl: 'button-previous.component.html',
})
export class ButtonPreviousComponent {
  constructor(private readService: ReadService) {}

  goPrevious() {
    this.readService.goPrevious();
  }
}
