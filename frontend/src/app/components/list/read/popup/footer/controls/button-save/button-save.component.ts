import { Component } from '@angular/core';
import { ReadService } from '@/services/read.service';

@Component({
  selector: 'popup-button-save',
  standalone: true,
  templateUrl: 'button-save.component.html',
})
export class ButtonSaveComponent {
  constructor(private readService: ReadService) {}

  save() {
    this.readService.refreshEntries();
    this.readService.isInEditingMode$.next(false);
  }
}
