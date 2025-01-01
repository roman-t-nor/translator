import { Component, inject, Input } from '@angular/core';
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
  http = inject(HttpClient);
  messageService = inject(MessageService);
  popupService = inject(PopupService);
  memoService = inject(MemoService);
  state = inject(StateService);
  @Input() entry!: Entry;

  submit($event: Event) {
    const target = $event.target as HTMLElement;
    const form = target.closest('form') as HTMLFormElement;
    const formData = new FormData(form);
    this.http
      .post(
        `sections/${this.state.sectionId}/elements/${this.entry.id}`,
        formData,
        { responseType: 'text' },
      )
      .subscribe((response) => {
        this.messageService.sendSuccess(response);
        this.popupService.hide();
        this.memoService.getEntries(this.state.sectionId);
      });
    $event.preventDefault();
  }
}
