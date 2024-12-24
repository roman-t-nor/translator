import { Component } from '@angular/core';
import { StateService } from '@/services/state.service';
import { PopupService } from '@/services/popup.service';
import { Entry } from '@/Entry';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'edit',
  standalone: true,
  templateUrl: 'edit.component.html',
  imports: [FormsModule],
})
export class EditComponent {
  entry: Entry;

  constructor(
    private state: StateService,
    private popupService: PopupService,
  ) {
    this.entry = this.state.currentEntry;
  }

  saveEditing($event: Event) {
    this.state.refreshEntries();
    this.popupService.isInEditingMode$.next(false);
    $event.preventDefault();
    $event.stopPropagation();
  }
}
