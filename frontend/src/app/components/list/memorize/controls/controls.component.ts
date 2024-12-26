import { Component, ElementRef, OnInit } from '@angular/core';
import { ButtonNextComponent } from './button-next/button-next.component';

@Component({
  selector: 'controls',
  standalone: true,
  imports: [ButtonNextComponent],
  templateUrl: 'controls.component.html',
})
export class ControlsComponent implements OnInit {
  constructor(private ref: ElementRef) {}

  ngOnInit(): void {
    this.ref.nativeElement.style.marginTop = `-${this.ref.nativeElement.offsetHeight}px`;
  }
}
