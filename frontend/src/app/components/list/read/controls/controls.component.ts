import { Component } from '@angular/core';
import { ButtonPopupSaveComponent } from './button-popup/button-popup.component';
import { ButtonTranslateComponent } from './button-translate/button-translate.component';
import { ButtonNextComponent } from './button-next/button-next.component';
import { ReadService } from '@/services/read.service';
import { PopupService } from '@/services/popup.service';
import { ButtonSettingsComponent } from '@/components/list/memo/controls/button-settings/button-settings.component';

@Component({
  selector: 'controls',
  standalone: true,
  imports: [
    ButtonTranslateComponent,
    ButtonNextComponent,
    ButtonPopupSaveComponent,
    ButtonSettingsComponent,
  ],
  templateUrl: 'controls.component.html',
})
export class ControlsComponent {
  constructor(
    protected state: ReadService,
    private popupService: PopupService,
  ) {}

  showPopup() {
    this.popupService.show();
  }

  translate() {
    this.state.translate();
  }

  goNext() {
    this.state.goNext();
  }
}
