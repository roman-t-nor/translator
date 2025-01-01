import { Component, ElementRef, Input } from '@angular/core';
import { Modal } from 'bootstrap';
import { PopupService } from '@/services/popup.service';
import { Subscription } from 'rxjs';
import { StateService } from '@/services/state.service';

@Component({
  selector: 'popup',
  standalone: true,
  templateUrl: 'popup.component.html',
})
export class PopupComponent {
  modal!: Modal;
  title: string = '';
  body: string = '';
  subscription?: Subscription;
  @Input() className?: string;
  handlerKeyDown: (e: KeyboardEvent) => void;
  handlerClosePopup: () => void;

  constructor(
    private state: StateService,
    private elementRef: ElementRef,
    private popupService: PopupService,
  ) {
    this.handlerKeyDown = this.onKeyDown.bind(this);
    this.handlerClosePopup = this.onClosePopup.bind(this);
  }

  ngOnInit(): void {
    window.addEventListener('keydown', this.handlerKeyDown);
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
      this.handlerClosePopup,
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.elementRef.nativeElement.removeEventListener(
      'hidden.bs.modal',
      this.handlerClosePopup,
    );
    window.removeEventListener('keydown', this.handlerKeyDown);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.popupService.hide();
      event.preventDefault();
    }
  }

  onClosePopup() {
    this.popupService.hide();
  }
}
