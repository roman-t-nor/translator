import { Component } from '@angular/core';
import { FormRowComponent } from '@/components/popup/body/form/form-row/form-row.component';
import { FormService } from '@/services/form.service';
import { Entry } from '@/Entry';
import { FormsModule } from '@angular/forms';
import { ButtonSaveComponent } from '@/components/popup/body/form/controls/button-save/button-save.component';
import { JsonPipe, NgIf } from '@angular/common';
import { StateService } from '@/services/state.service';
import { SaveService } from '@/services/save/save.service';
import { ButtonSavingComponent } from '@/components/popup/body/form/controls/button-saving/button-saving.component';
import { MessageService } from '@/services/message.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'popup-form',
  standalone: true,
  templateUrl: 'form.component.html',
  imports: [
    FormRowComponent,
    FormsModule,
    ButtonSaveComponent,
    JsonPipe,
    ButtonSavingComponent,
    NgIf,
  ],
})
export class FormComponent {
  currentEntry!: Entry;
  entriesFoundInPast?: SafeHtml;

  constructor(
    private formService: FormService,
    private state: StateService,
    private saveService: SaveService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
  ) {
    this.currentEntry = this.state.currentEntry;
  }

  get entries(): Entry[] {
    return this.formService.entries;
  }

  get isShow(): boolean {
    return !!this.formService.entries.length;
  }

  get sectionId() {
    return this.state.sectionId;
  }

  remove(index: number) {
    this.formService.removeEntry(index);
  }

  submit($event: Event): void {
    if (!this.sectionId) {
      this.messageService.sendError('Section for saving is not supplied');
      return;
    }
    this.saveService.isSaving$.next(true);
    this.saveService.save($event).subscribe({
      next: (response: string) => {
        this.formService.entries = [];
        this.messageService.sendSuccess('Elements saved');
        if (response) {
          const safeResponse = this.sanitizer.bypassSecurityTrustHtml(response);
          this.entriesFoundInPast = safeResponse;
        }
      },
      complete: () => {
        this.saveService.isSaving$.next(false);
      },
    });
  }
}
