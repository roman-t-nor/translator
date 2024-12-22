import { Component } from '@angular/core';
import { StateService } from '@/services/state.service';
import { TranslationsComponent } from './translations/translations.component';
import { PopupService } from '@/services/popup.service';
import { FormComponent } from '@/components/popup/body/form/form.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'popup-body',
  standalone: true,
  templateUrl: 'body.component.html',
  styles: ':host{display: flex; flex-wrap: wrap; height: 100%;}',
  imports: [TranslationsComponent, FormComponent, AsyncPipe],
})
export class BodyComponent {
  constructor(
    private state: StateService,
    private popupService: PopupService,
  ) {}

  get text() {
    return this.state.currentEntry.text;
  }

  get isInSavingMode() {
    return this.popupService.isInSavingMode$;
  }
}
