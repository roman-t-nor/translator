import { afterRender, Component, ElementRef, output } from '@angular/core';
import { ButtonNextComponent } from './button-next/button-next.component';
import { ButtonShuffleComponent } from '@/components/list/memo/controls/button-shuffle/button-shuffle.component';
import { ButtonBeginComponent } from '@/components/list/memo/controls/button-begin/button-begin.component';
import { PopupService } from '@/services/popup.service';
import { MemoService } from '@/services/memo.service';
import { ButtonPopupWeakComponent } from '@/components/list/memo/controls/button-popup-weak/button-popup-weak.component';
import { ButtonPopupStrictComponent } from '@/components/list/memo/controls/button-popup-strict/button-popup-strict.component';
import { NgIf } from '@angular/common';
import { ButtonSettingsComponent } from '@/components/list/memo/controls/button-settings/button-settings.component';
import { ButtonVisibilityComponent } from '@/components/list/memo/controls/button-visibility/button-visibility.component';

@Component({
  selector: 'controls',
  standalone: true,
  imports: [
    ButtonSettingsComponent,
    ButtonNextComponent,
    ButtonShuffleComponent,
    ButtonBeginComponent,
    ButtonPopupWeakComponent,
    ButtonPopupStrictComponent,
    NgIf,
    ButtonVisibilityComponent,
  ],
  templateUrl: 'controls.component.html',
})
export class ControlsComponent {
  shuffled = output();

  constructor(
    public state: MemoService,
    private ref: ElementRef,
    private popupService: PopupService,
  ) {
    afterRender(() => {
      // this.ref.nativeElement.style.marginTop = `-${this.ref.nativeElement.offsetHeight}px`;
    });
  }

  showPopupWeak() {
    this.state.mode = 'weak';
    this.state.isShowInWeakMode = true;
    this.state.isShowMemoPopup = true;
    this.popupService.show();
  }

  showPopupStrict() {
    this.state.mode = 'strict';
    this.state.isShowInWeakMode = false;
    this.state.isShowMemoPopup = true;
    this.popupService.show();
  }

  goBegin() {
    this.state.goBegin();
  }

  shuffle() {
    this.shuffled.emit();
  }

  goNext() {
    this.state.goNext();
  }

  visibility() {
    this.state.isShowListInStrictMode = !this.state.isShowListInStrictMode;
  }
}
