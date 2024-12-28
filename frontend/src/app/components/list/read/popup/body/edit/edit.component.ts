import { Component } from '@angular/core';
import { Entry } from '@/Entry';
import { FormsModule } from '@angular/forms';
import { ReadService } from '@/services/read.service';

@Component({
  selector: 'edit',
  standalone: true,
  templateUrl: 'edit.component.html',
  imports: [FormsModule],
})
export class EditComponent {
  entry: Entry;

  constructor(private readService: ReadService) {
    this.entry = this.readService.currentEntry;
  }

  saveEditing($event: Event) {
    this.readService.refreshEntries();
    this.readService.isInEditingMode$.next(false);
    $event.preventDefault();
    $event.stopPropagation();
  }
}
