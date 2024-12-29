import { Component, inject } from '@angular/core';
import { PopupComponent } from '@/components/popup/popup.component';
import { MemoService } from '@/services/memo.service';
import { Entry } from '@/Entry';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MessageService } from '@/services/message.service';
import { PopupService } from '@/services/popup.service';
import { StateService } from '@/services/state.service';

@Component({
  selector: 'popup-edit',
  standalone: true,
  imports: [PopupComponent, FormsModule],
  templateUrl: './popup.component.html',
})
export class PopupMemoEditComponent {
  entry: Entry;
  http = inject(HttpClient);
  messageService = inject(MessageService);
  popupService = inject(PopupService);
  memoService = inject(MemoService);
  state = inject(StateService);

  constructor() {
    this.entry = this.memoService.entries.find(
      (e) => e.id === this.memoService.editedEntryId,
    ) as Entry;
  }

  submit($event: Event) {
    this.http
      .post(
        `sections/${this.state.sectionId}/elements/${this.entry.id}`,
        new FormData($event.target as HTMLFormElement),
        { responseType: 'text' },
      )
      .subscribe((response) => {
        this.messageService.sendSuccess(response);
        this.popupService.isOpen$.next(false);
        this.memoService.getEntries(this.state.sectionId);
      });
  }
}
