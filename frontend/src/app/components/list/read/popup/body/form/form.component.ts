import { Component } from '@angular/core';
import { FormService } from '@/services/form.service';
import { Entry } from '@/Entry';
import { FormsModule } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { SaveService } from '@/services/save/save.service';
import { MessageService } from '@/services/message.service';
import { DbElementType } from '@/types/db';
import { ReadService } from '@/services/read.service';
import { StateService } from '@/services/state.service';
import { FormRowComponent } from '@/components/list/read/popup/body/form/form-row/form-row.component';
import { ButtonSavingComponent } from '@/components/list/read/popup/body/form/controls/button-saving/button-saving.component';
import { ButtonSaveComponent } from '@/components/list/read/popup/body/form/controls/button-save/button-save.component';
import { DuplicatesComponent } from '@/components/list/read/popup/body/duplicates/duplicates.component';

@Component({
  selector: 'popup-form',
  standalone: true,
  templateUrl: 'form.component.html',
  imports: [
    FormsModule,
    JsonPipe,
    NgIf,
    FormRowComponent,
    ButtonSavingComponent,
    ButtonSaveComponent,
    DuplicatesComponent,
  ],
})
export class FormComponent {
  currentEntry!: Entry;
  duplicates: DbElementType[] = [];

  constructor(
    private formService: FormService,
    private state: StateService,
    private readService: ReadService,
    private saveService: SaveService,
    private messageService: MessageService,
  ) {
    this.currentEntry = this.readService.currentEntry;
    this.formService.isEntriesExist$.subscribe((value: boolean) => {
      if (value) {
        this.duplicates = [];
      }
    });
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
      this.messageService.sendError('Section for saving is not selected');
      return;
    }
    this.saveService.isSaving$.next(true);
    this.saveService.save($event).subscribe({
      next: (response: DbElementType[]) => {
        this.formService.removeAllEntries();
        this.messageService.sendSuccess('Elements saved');
        if (response) {
          this.duplicates = response;
        }
      },
      complete: () => {
        this.saveService.isSaving$.next(false);
      },
    });
  }
}
