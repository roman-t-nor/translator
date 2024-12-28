import { Component, Inject, inject } from '@angular/core';
import { Entry } from '@/Entry';
import { ItemComponent } from './item/item.component';
import { ControlsComponent } from './controls/controls.component';
import { PopupReadComponent } from '@/components/list/read/popup/popup.component';
import { ReadService } from '@/services/read.service';
import { PopupService } from '@/services/popup.service';
import { EntriesProviderService } from '@/services/entries-provider.service';

@Component({
  selector: 'list-read',
  standalone: true,
  imports: [ItemComponent, ControlsComponent, PopupReadComponent],
  templateUrl: './list-read.component.html',
  styles: ':host{display: flex;flex-direction: column;flex-grow: 1;}',
})
export class ListReadComponent {
  readService: ReadService = inject(ReadService);
  popupService: PopupService = inject(PopupService);
  entriesService: EntriesProviderService = inject(EntriesProviderService);

  constructor(
    private entriesProviderService: EntriesProviderService,
    @Inject('isGetEntriesInTestMode') private isGetEntriesInTestMode: boolean,
  ) {}

  get entries(): Entry[] {
    return this.readService.entries;
  }

  ngOnInit(): void {
    window.addEventListener('keydown', this.handlerKeyDown.bind(this));

    const handleWheel = this.handleWheel.bind(this);
    this.popupService.isOpen$.subscribe((value) => {
      if (value) {
        window.addEventListener('wheel', handleWheel);
      } else {
        window.removeEventListener('wheel', handleWheel);
      }
    });

    if (this.isGetEntriesInTestMode) {
      const entries = this.entriesService.getTestEntries();
      this.readService.entries = entries;
      this.readService.currentEntry = entries[0];
      this.readService.currentEntryIndex = 0;
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handlerKeyDown.bind(this));
    window.removeEventListener('wheel', this.handleWheel.bind(this));
  }

  handlerKeyDown(event: KeyboardEvent) {
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
        this.popupService.isOpen$.next(true);
      } else if (event.ctrlKey) {
        this.readService.translate();
      } else {
        this.readService.goNext();
      }
      event.preventDefault();
    }

    if (event.code === 'Escape') {
      this.popupService.isOpen$.next(false);
      event.preventDefault();
    }
  }

  handleWheel(event: WheelEvent) {
    if (event.deltaY < 0) {
      this.readService.goPrevious();
    } else {
      this.readService.goNext();
    }
  }
}
