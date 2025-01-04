import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ReadService } from '@/services/read.service';
import { StatsComponent } from '@/components/stats/stats.component';

@Component({
  selector: 'popup-header-read',
  standalone: true,
  templateUrl: 'header.component.html',
  imports: [AsyncPipe, StatsComponent],
  styles: ':host{width: 100%}',
})
export class PopupHeaderReadComponent {
  isInEditingMode: boolean = false;

  constructor(public state: ReadService) {
    this.state.isInEditingMode$.subscribe((value: boolean) => {
      this.isInEditingMode = value;
    });
  }

  get isInSavingMode() {
    return this.state.isInSavingMode$;
  }

  get text() {
    return this.state.currentEntry.text;
  }

  edit() {
    this.state.isInEditingMode$.next(true);
  }

  save() {
    this.state.refreshEntries();
    this.state.isInEditingMode$.next(false);
  }
}
