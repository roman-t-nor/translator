import { Component } from '@angular/core';
import { PopupComponent } from '@/components/popup/popup.component';
import { MemoService } from '@/services/memo.service';
import { Entry } from '@/Entry';

@Component({
  selector: 'popup-edit',
  standalone: true,
  imports: [PopupComponent],
  templateUrl: './popup.component.html',
})
export class PopupMemoEditComponent {
  entry: Entry;

  constructor(public state: MemoService) {
    this.entry = this.state.entries.find(
      (e) => e.id === this.state.editedEntryId,
    ) as Entry;
  }
}
