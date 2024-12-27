import { Component, Inject, isDevMode, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ListComponent } from '@/components/list/list.component';
import { MessageComponent } from './components/message/message.component';
import { StateService } from './services/state.service';
import { PopupService } from './services/popup.service';
import { SettingsComponent } from '@/components/settings/settings.component';
import { EntriesProviderService } from '@/services/entries-provider.service';
import { HeadComponent } from '@/components/head/head.component';
import { ReadService } from '@/services/read.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListComponent, MessageComponent, SettingsComponent, HeadComponent],
  templateUrl: './app.component.html',
  styles: ':host{display: flex;flex-direction: column;flex-grow: 1;}',
})
export class AppComponent implements OnInit {
  title = 'Angular ajax translate';

  public constructor(
    private titleService: Title,
    private state: StateService,
    private readService: ReadService,
    private popupService: PopupService,
    private entriesProviderService: EntriesProviderService,
    @Inject('isGetEntriesInTestMode') private isGetEntriesInTestMode: boolean,
  ) {}

  ngOnInit(): void {
    this.title += isDevMode() ? ' - DEVELOPMENT' : '';
    this.titleService.setTitle(this.title);

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
      const entries = this.entriesProviderService.getTestEntries();
      this.readService.entries = entries;
      this.readService.currentEntry = entries[0];
      this.readService.currentEntryIndex = 0;
    }

    this.state.getSections();
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
