import { Component, ElementRef, OnInit, output } from '@angular/core';
import { ButtonNextComponent } from './button-next/button-next.component';
import { ButtonShuffleComponent } from '@/components/list/memo/controls/button-shuffle/button-shuffle.component';
import { ButtonBeginComponent } from '@/components/list/memo/controls/button-begin/button-begin.component';
import { ButtonPopupMemoComponent } from '@/components/list/memo/controls/button-popup/button-popup.component';
import { PopupService } from '@/services/popup.service';
import { MemoService } from '@/services/memo.service';

@Component({
  selector: 'controls',
  standalone: true,
  imports: [
    ButtonNextComponent,
    ButtonShuffleComponent,
    ButtonBeginComponent,
    ButtonPopupMemoComponent,
  ],
  templateUrl: 'controls.component.html',
})
export class ControlsComponent implements OnInit {
  shuffled = output();

  showPopup() {
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

  constructor(
    private ref: ElementRef,
    private popupService: PopupService,
    private state: MemoService,
  ) {}

  ngOnInit(): void {
    this.ref.nativeElement.style.marginTop = `-${this.ref.nativeElement.offsetHeight}px`;
  }
}
