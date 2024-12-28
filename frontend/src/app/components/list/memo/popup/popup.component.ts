import { Component } from '@angular/core';
import { PopupComponent } from '@/components/popup/popup.component';
import { MemoService } from '@/services/memo.service';
import { StatsComponent } from '@/components/stats/stats.component';

@Component({
  selector: 'popup-memo',
  standalone: true,
  imports: [PopupComponent, StatsComponent],
  templateUrl: './popup.component.html',
})
export class PopupMemoComponent {
  constructor(public state: MemoService) {}

  get entry() {
    return this.state.currentEntry;
  }

  goNext() {
    this.state.goNext();
  }
}
