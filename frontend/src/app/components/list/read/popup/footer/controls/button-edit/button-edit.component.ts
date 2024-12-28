import { Component } from '@angular/core';
import { ReadService } from '@/services/read.service';

@Component({
  selector: 'popup-button-edit',
  standalone: true,
  templateUrl: 'button-edit.component.html',
})
export class ButtonEditComponent {
  constructor(private readService: ReadService) {}

  edit() {
    this.readService.isInEditingMode$.next(true);
  }
}
