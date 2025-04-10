import { Component } from '@angular/core';
import { TranslationsComponent } from './translations/translations.component';
import { AsyncPipe } from '@angular/common';
import { Entry } from '@/Entry';
import { FormsModule } from '@angular/forms';
import { ReadService } from '@/services/read.service';
import { FormComponent } from '@/components/list/read/popup/body/form/form.component';
import { EditComponent } from '@/components/list/read/popup/body/edit/edit.component';

@Component({
  selector: 'popup-body-read',
  standalone: true,
  templateUrl: 'body.component.html',
  styles: ':host{display: flex; flex-wrap: wrap; height: 100%;}',
  imports: [
    TranslationsComponent,
    AsyncPipe,
    FormsModule,
    FormComponent,
    EditComponent,
  ],
})
export class PopupBodyReadComponent {
  entry: Entry;
  isInEditingMode: boolean = false;

  constructor(private state: ReadService) {
    this.entry = this.state.currentEntry;
    this.state.currentEntryIndex$.subscribe((currentEntryIndex) => {
      this.entry = this.state.entries[currentEntryIndex];
    });
    this.state.isInEditingMode$.subscribe((value: boolean) => {
      this.isInEditingMode = value;
    });
  }

  get isInSavingMode() {
    return this.state.isInSavingMode$;
  }
}
