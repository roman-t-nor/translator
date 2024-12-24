import { Component } from '@angular/core';
import { StateService } from '@/services/state.service';
import { TranslationsComponent } from './translations/translations.component';
import { PopupService } from '@/services/popup.service';
import { FormComponent } from '@/components/popup/body/form/form.component';
import { AsyncPipe } from '@angular/common';
import { Entry } from '@/Entry';
import { FormsModule } from '@angular/forms';
import { EditComponent } from '@/components/popup/body/edit/edit.component';

@Component({
  selector: 'popup-body',
  standalone: true,
  templateUrl: 'body.component.html',
  styles: ':host{display: flex; flex-wrap: wrap; height: 100%;}',
  imports: [
    TranslationsComponent,
    FormComponent,
    AsyncPipe,
    FormsModule,
    EditComponent,
  ],
})
export class BodyComponent {
  entry: Entry;
  isInEditingMode: boolean = false;

  constructor(
    private state: StateService,
    private popupService: PopupService,
  ) {
    this.entry = this.state.currentEntry;
    this.state.currentEntryIndex$.subscribe((currentEntryIndex) => {
      this.entry = this.state.entries[currentEntryIndex];
    });
    this.popupService.isInEditingMode$.subscribe((value: boolean) => {
      this.isInEditingMode = value;
    });
  }

  get isInSavingMode() {
    return this.popupService.isInSavingMode$;
  }
}
