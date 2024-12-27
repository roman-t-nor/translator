import { Component, ElementRef, OnInit } from '@angular/core';
import { ButtonNextComponent } from './button-next/button-next.component';
import { ButtonShuffleComponent } from '@/components/list/memo/controls/button-shuffle/button-shuffle.component';
import { ButtonBeginComponent } from '@/components/list/memo/controls/button-begin/button-begin.component';
import { ButtonPopupMemoComponent } from '@/components/list/memo/controls/button-popup/button-popup.component';

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
  constructor(private ref: ElementRef) {}

  ngOnInit(): void {
    this.ref.nativeElement.style.marginTop = `-${this.ref.nativeElement.offsetHeight}px`;
  }
}
