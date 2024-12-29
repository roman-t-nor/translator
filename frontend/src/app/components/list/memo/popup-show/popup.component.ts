import { Component, inject } from '@angular/core';
import { PopupComponent } from '@/components/popup/popup.component';
import { MemoService } from '@/services/memo.service';
import { Entry } from '@/Entry';

@Component({
  selector: 'popup-show',
  standalone: true,
  imports: [PopupComponent],
  templateUrl: './popup.component.html',
})
export class PopupMemoShowComponent {
  entry: Entry;
  memoService = inject(MemoService);

  constructor() {
    this.entry = this.memoService.entries.find(
      (e) => e.id === this.memoService.editedEntryId,
    ) as Entry;
  }
}
