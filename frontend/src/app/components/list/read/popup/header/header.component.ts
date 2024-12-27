import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ReadService } from '@/services/read.service';

@Component({
  selector: 'popup-header-read',
  standalone: true,
  templateUrl: 'header.component.html',
  imports: [AsyncPipe],
})
export class HeaderReadComponent {
  constructor(private readService: ReadService) {}

  get isInSavingMode() {
    return this.readService.isInSavingMode$;
  }

  get text() {
    return this.readService.currentEntry.text;
  }
}
