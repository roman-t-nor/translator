import { Component } from '@angular/core';
import { ButtonTranslateComponent } from './controls/button-translate/button-translate.component';
import { ButtonPreviousComponent } from './controls/button-previous/button-previous.component';
import { ButtonNextComponent } from './controls/button-next/button-next.component';
import { ButtonEditComponent } from '@/components/popup/footer/controls/button-edit/button-edit.component';
import { ButtonSaveComponent } from '@/components/popup/footer/controls/button-save/button-save.component';
import { PopupService } from '@/services/popup.service';

@Component({
  selector: 'popup-footer',
  standalone: true,
  templateUrl: 'footer.component.html',
  imports: [
    ButtonTranslateComponent,
    ButtonPreviousComponent,
    ButtonNextComponent,
    ButtonEditComponent,
    ButtonSaveComponent,
  ],
})
export class FooterComponent {
  isInEditingMode: boolean = false;

  constructor(private popupService: PopupService) {
    this.popupService.isInEditingMode$.subscribe((value: boolean) => {
      this.isInEditingMode = value;
    });
  }
}
