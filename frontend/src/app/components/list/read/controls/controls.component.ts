import { Component, ElementRef, OnInit } from '@angular/core';
import { ButtonPopupComponent } from './button-popup/button-popup.component';
import { ButtonTranslateComponent } from './button-translate/button-translate.component';
import { ButtonNextComponent } from './button-next/button-next.component';

@Component({
  selector: 'controls',
  standalone: true,
  imports: [
    ButtonPopupComponent,
    ButtonTranslateComponent,
    ButtonNextComponent,
  ],
  templateUrl: 'controls.component.html',
})
export class ControlsComponent implements OnInit {
  constructor(private ref: ElementRef) {}

  ngOnInit(): void {
    this.ref.nativeElement.style.marginTop = `-${this.ref.nativeElement.offsetHeight}px`;
  }
}
