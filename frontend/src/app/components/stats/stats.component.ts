import { Component, Input } from '@angular/core';
import { ReadService } from '@/services/read.service';
import { MemoService } from '@/services/memo.service';

@Component({
  selector: 'stats',
  standalone: true,
  template:
    '<span class="stats">{{ index }} / {{ total }} ({{ percent }}%)</span>',
})
export class StatsComponent {
  @Input({ required: true }) state!: ReadService | MemoService;

  get index() {
    return this.state.currentEntryIndex + 1;
  }

  get total() {
    return this.state.entries.length;
  }

  get percent() {
    return Math.floor((this.index / this.total) * 100);
  }
}
