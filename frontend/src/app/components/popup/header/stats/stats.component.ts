import { Component } from '@angular/core';
import { StateService } from '@/services/state.service';

@Component({
  selector: 'stats',
  standalone: true,
  template:
    '<div class="stats">{{ index }} / {{ total }} ({{ percent }}%)</div>',
})
export class StatsComponent {
  constructor(private state: StateService) {}

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
