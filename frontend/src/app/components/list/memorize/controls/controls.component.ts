import { Component, ElementRef, OnInit } from '@angular/core';
import { ButtonNextComponent } from './button-next/button-next.component';
import { ButtonShuffleComponent } from '@/components/list/memorize/controls/button-shuffle/button-shuffle.component';
import { ButtonBeginComponent } from '@/components/list/memorize/controls/button-begin/button-begin.component';

@Component({
  selector: 'controls',
  standalone: true,
  imports: [ButtonNextComponent, ButtonShuffleComponent, ButtonBeginComponent],
  templateUrl: 'controls.component.html',
})
export class ControlsComponent implements OnInit {
  constructor(private ref: ElementRef) {}

  ngOnInit(): void {
    this.ref.nativeElement.style.marginTop = `-${this.ref.nativeElement.offsetHeight}px`;
  }
}
