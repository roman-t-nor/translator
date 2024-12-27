import { Component } from '@angular/core';
import { ReadService } from '@/services/read.service';

@Component({
  selector: 'button-translate',
  standalone: true,
  templateUrl: 'button-translate.component.html',
  host: {
    '(click)': 'translate()',
  },
})
export class ButtonTranslateComponent {
  constructor(private readService: ReadService) {}

  translate() {
    this.readService.translate();
  }
}
