import { Component, ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';
import { PopupService } from '@/services/popup.service';
import { Subscription } from 'rxjs';
import { StateService } from '@/services/state.service';

@Component({
  selector: 'popup',
  standalone: true,
  templateUrl: 'popup.component.html',
  imports: [],
})
export class PopupComponent {
  modal!: Modal;
  title: string = '';
  body: string = '';
  subscription?: Subscription;

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

    this.subscription = this.popupService.isOpen$.subscribe((value) => {
      if (value) {
        this.modal.show();
      } else {
        this.modal.hide();
      }
    });

    this.elementRef.nativeElement.addEventListener(
      'hidden.bs.modal',
      this.handleClosePopup.bind(this),
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.elementRef.nativeElement.removeEventListener(
      'hidden.bs.modal',
      this.handleClosePopup.bind(this),
    );
  }

  handleClosePopup() {
    this.popupService.isOpen$.next(false);
  }
}
