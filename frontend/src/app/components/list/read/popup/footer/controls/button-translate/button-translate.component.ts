import { Component } from '@angular/core';
import { ReadService } from '@/services/read.service';

@Component({
  selector: 'popup-button-translate',
  standalone: true,
  templateUrl: 'button-translate.component.html',
})
export class ButtonTranslateComponent {
  constructor(private readService: ReadService) {}

  translate() {
    this.readService.translate();
  }
}
