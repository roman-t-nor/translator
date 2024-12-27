import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { StatsComponent } from '@/components/stats/stats.component';
import { MemoService } from '@/services/memo.service';

@Component({
  selector: 'popup-header-memo',
  standalone: true,
  templateUrl: 'header.component.html',
  imports: [AsyncPipe, StatsComponent],
})
export class HeaderMemoComponent {
  constructor(public memoService: MemoService) {}
}
