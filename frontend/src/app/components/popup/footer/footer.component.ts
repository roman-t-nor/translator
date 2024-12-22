import { Component } from '@angular/core';
import { ButtonTranslateComponent } from './controls/button-translate/button-translate.component';
import { ButtonPreviousComponent } from './controls/button-previous/button-previous.component';
import { ButtonNextComponent } from './controls/button-next/button-next.component';

@Component({
  selector: 'popup-footer',
  standalone: true,
  templateUrl: 'footer.component.html',
  imports: [
    ButtonTranslateComponent,
    ButtonPreviousComponent,
    ButtonNextComponent,
  ],
})
export class FooterComponent {}
