import { Component } from '@angular/core';
import { EntriesProviderService } from '@/services/entries-provider.service';
import { FormService } from '@/services/form.service';
import { ReadService } from '@/services/read.service';

@Component({
  selector: 'content-upload',
  standalone: true,
  imports: [],
  templateUrl: './content-upload.component.html',
})
export class ContentUploadComponent {
  constructor(
    private entriesProviderService: EntriesProviderService,
    private readService: ReadService,
    private formService: FormService,
  ) {}

  handleFileUpload($event: Event) {
    const target = $event.target as HTMLElement;
    const form = target.closest('form') as HTMLFormElement;
    const file = new FormData(form).get('file') as File;
    const entries$ = this.entriesProviderService.getEntriesFromFile(file);
    const currentEntryIndex = Number(localStorage.getItem(file.name));
    entries$.subscribe((entries) => {
      this.readService.entries = entries;
      this.readService.currentEntryIndex$.next(currentEntryIndex);
    });
    this.readService.fileName = file.name;
    this.formService.removeAllEntries();
  }

  handleTextInsert($event: Event) {
    const target = $event.target as HTMLInputElement;
    const entries = this.entriesProviderService.getEntriesFromPaste(
      target.value,
    );
    this.readService.entries = entries;
    this.readService.currentEntry = entries[0];
    this.formService.removeAllEntries();
  }
}
