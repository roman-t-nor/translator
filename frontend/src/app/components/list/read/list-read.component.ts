import { Component, Inject, inject } from '@angular/core';
import { Entry } from '@/Entry';
import { ItemComponent } from './item/item.component';
import { ControlsComponent } from './controls/controls.component';
import { PopupReadComponent } from '@/components/list/read/popup/popup.component';
import { ReadService } from '@/services/read.service';
import { PopupService } from '@/services/popup.service';
import { EntriesProviderService } from '@/services/entries-provider.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'list-read',
  standalone: true,
  imports: [ItemComponent, ControlsComponent, PopupReadComponent],
  templateUrl: './list-read.component.html',
})
export class ListReadComponent {
  readService: ReadService = inject(ReadService);
  popupService: PopupService = inject(PopupService);
  entriesService: EntriesProviderService = inject(EntriesProviderService);
  handlerKeyDown: (event: KeyboardEvent) => void;
  handlerWheel: (event: WheelEvent) => void;
  subscription: Subscription;

  constructor(
    private entriesProviderService: EntriesProviderService,
    @Inject('isGetEntriesInTestMode') private isGetEntriesInTestMode: boolean,
  ) {
    this.handlerKeyDown = this.onKeyDown.bind(this);
    this.handlerWheel = this.onWheel.bind(this);

    this.subscription = this.popupService.isOpen$.subscribe((value) => {
      if (value) {
        window.addEventListener('wheel', this.handlerWheel);
      } else {
        window.removeEventListener('wheel', this.handlerWheel);
      }
    });
  }

  get entries(): Entry[] {
    return this.readService.entries;
  }

  ngOnInit(): void {
    window.addEventListener('keydown', this.handlerKeyDown);

    if (this.isGetEntriesInTestMode) {
      const entries = this.entriesService.getTestEntries();
      this.readService.entries = entries;
      this.readService.currentEntry = entries[0];
      this.readService.currentEntryIndex = 0;
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handlerKeyDown);
    window.removeEventListener('wheel', this.handlerWheel);
    this.subscription.unsubscribe();
  }

  onKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    if (target.closest('form')) {
      return;
    }

    if (['ArrowLeft', 'ArrowUp'].includes(event.code)) {
      this.readService.goPrevious();
      event.preventDefault();
    }

    if (['ArrowRight', 'ArrowDown'].includes(event.code)) {
      this.readService.goNext();
      event.preventDefault();
    }

    if (event.code === 'Space') {
      this.readService.translate();
      event.preventDefault();
    }

    if (event.code === 'Enter') {
      if (event.shiftKey) {
        this.popupService.show();
      } else if (event.ctrlKey) {
        this.readService.translate();
      } else {
        this.readService.goNext();
      }
      event.preventDefault();
    }
  }

  onWheel(event: WheelEvent) {
    if (event.deltaY < 0) {
      this.readService.goPrevious();
    } else {
      this.readService.goNext();
    }
  }
}
