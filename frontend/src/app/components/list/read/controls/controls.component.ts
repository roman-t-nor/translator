import { Component, ElementRef, OnInit } from '@angular/core';
import { ButtonPopupSaveComponent } from './button-popup/button-popup.component';
import { ButtonTranslateComponent } from './button-translate/button-translate.component';
import { ButtonNextComponent } from './button-next/button-next.component';
import { ReadService } from '@/services/read.service';
import { PopupService } from '@/services/popup.service';

@Component({
  selector: 'controls',
  standalone: true,
  imports: [
    ButtonTranslateComponent,
    ButtonNextComponent,
    ButtonPopupSaveComponent,
  ],
  templateUrl: 'controls.component.html',
})
export class ControlsComponent implements OnInit {
  constructor(
    private ref: ElementRef,
    private state: ReadService,
    private popupService: PopupService,
  ) {}

  ngOnInit(): void {
    this.ref.nativeElement.style.marginTop = `-${this.ref.nativeElement.offsetHeight}px`;
  }

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
