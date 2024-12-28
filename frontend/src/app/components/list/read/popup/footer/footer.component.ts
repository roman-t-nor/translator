import { Component } from '@angular/core';
import { ButtonTranslateComponent } from './controls/button-translate/button-translate.component';
import { ButtonPreviousComponent } from './controls/button-previous/button-previous.component';
import { ButtonNextComponent } from './controls/button-next/button-next.component';
import { ReadService } from '@/services/read.service';
import { ButtonSaveComponent } from '@/components/list/read/popup/footer/controls/button-save/button-save.component';
import { ButtonEditComponent } from '@/components/list/read/popup/footer/controls/button-edit/button-edit.component';

@Component({
  selector: 'popup-footer-read',
  standalone: true,
  templateUrl: 'footer.component.html',
  imports: [
    ButtonTranslateComponent,
    ButtonPreviousComponent,
    ButtonNextComponent,
    ButtonSaveComponent,
    ButtonEditComponent,
  ],
})
export class PopupFooterReadComponent {
  isInEditingMode: boolean = false;

  constructor(private state: ReadService) {
    this.state.isInEditingMode$.subscribe((value: boolean) => {
      this.isInEditingMode = value;
    });
  }

  goPrevious() {
    this.state.goPrevious();
  }

  translate() {
    this.state.translate();
  }

  goNext() {
    this.state.goNext();
  }

  edit() {
    this.state.isInEditingMode$.next(true);
  }

  save() {
    this.state.refreshEntries();
    this.state.isInEditingMode$.next(false);
  }
}
