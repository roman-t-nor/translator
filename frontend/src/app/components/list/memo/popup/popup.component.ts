import { Component } from '@angular/core';
import { PopupComponent } from '@/components/popup/popup.component';
import { MemoService } from '@/services/memo.service';
import { StatsComponent } from '@/components/stats/stats.component';
import { Entry } from '@/Entry';

@Component({
  selector: 'popup-memo',
  standalone: true,
  imports: [PopupComponent, StatsComponent],
  templateUrl: './popup.component.html',
})
export class PopupMemoComponent {
  entry: Entry;

  constructor(public state: MemoService) {
    this.entry = this.state.entries[0];
    this.state.currentEntry$.subscribe((entry: Entry) => {
      this.entry = entry;
    });
  }

  goNext() {
    this.state.goNext();
  }
}
