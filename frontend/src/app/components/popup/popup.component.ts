import { Component, ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';
import { PopupService } from '@/services/popup.service';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { StateService } from '@/services/state.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'popup',
  standalone: true,
  templateUrl: 'popup.component.html',
  imports: [HeaderComponent, BodyComponent, FooterComponent, NgIf],
})
export class PopupComponent {
  modal!: Modal;
  title: string = '';
  body: string = '';

  constructor(
    private state: StateService,
    private elementRef: ElementRef,
    private popupService: PopupService,
  ) {}

  get isEntriesLoaded(): boolean {
    return !!this.state.currentEntry;
  }

  ngOnInit(): void {
    const node = this.elementRef.nativeElement.querySelector('.modal');
    this.modal = new Modal(node);
    this.popupService.isOpen$.subscribe((value) => {
      if (value) {
        this.modal.show();
      } else {
        this.modal.hide();
      }
    });
    this.elementRef.nativeElement.addEventListener('hidden.bs.modal', () =>
      this.popupService.isOpen$.next(false),
    );
  }
}
