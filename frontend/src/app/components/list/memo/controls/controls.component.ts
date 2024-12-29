import { Component, ElementRef, OnInit, output } from '@angular/core';
import { ButtonNextComponent } from './button-next/button-next.component';
import { ButtonShuffleComponent } from '@/components/list/memo/controls/button-shuffle/button-shuffle.component';
import { ButtonBeginComponent } from '@/components/list/memo/controls/button-begin/button-begin.component';
import { PopupService } from '@/services/popup.service';
import { MemoService } from '@/services/memo.service';
import { ButtonPopupWeakComponent } from '@/components/list/memo/controls/button-popup-weak/button-popup-weak.component';
import { ButtonPopupStrictComponent } from '@/components/list/memo/controls/button-popup-strict/button-popup-strict.component';

@Component({
  selector: 'controls',
  standalone: true,
  imports: [
    ButtonNextComponent,
    ButtonShuffleComponent,
    ButtonBeginComponent,
    ButtonPopupWeakComponent,
    ButtonPopupStrictComponent,
  ],
  templateUrl: 'controls.component.html',
})
export class ControlsComponent implements OnInit {
  shuffled = output();

  constructor(
    private ref: ElementRef,
    private popupService: PopupService,
    private state: MemoService,
  ) {}

  showPopupWeak() {
    this.state.mode = 'weak';
    this.state.isShowInWeakMode = true;
    this.popupService.show();
  }

  showPopupStrict() {
    this.state.mode = 'strict';
    this.state.isShowInWeakMode = false;
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

  ngOnInit(): void {
    this.ref.nativeElement.style.marginTop = `-${this.ref.nativeElement.offsetHeight}px`;
  }
}
