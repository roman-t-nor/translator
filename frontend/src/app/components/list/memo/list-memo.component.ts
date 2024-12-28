import { Component, ElementRef } from '@angular/core';
import { MemoService, StyledEntry } from '@/services/memo.service';
import { ControlsComponent } from '@/components/list/memo/controls/controls.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { PopupMemoComponent } from '@/components/list/memo/popup/popup.component';

@Component({
  selector: 'list-memo',
  standalone: true,
  templateUrl: './list-memo.component.html',
  styles: '.animating .item {font-weight: normal !important;}',
  imports: [ControlsComponent, AsyncPipe, NgIf, PopupMemoComponent],
})
export class ListMemoComponent {
  constructor(
    public state: MemoService,
    private ref: ElementRef,
  ) {}

  get entries(): StyledEntry[] {
    return this.state.entries;
  }

  shuffle() {
    const container = this.ref.nativeElement.querySelector('[data-shuffled]');

    const listHeight = container.offsetHeight;

    const transitionTime = 300;
    const rowHeight = listHeight / this.state.entries.length;
    container.style.height = listHeight + 'px';
    container.classList.add('animating');

    this.state.resetCurrentIndex();
    const entries = this.state.entries;

    entries.map((e, i) => {
      e.style = {
        position: 'absolute',
        top: rowHeight * i + 'px',
        transition: 'top ' + transitionTime + 'ms',
        width: '100%',
      };
      return e;
    });

    const shuffled = entries
      .map((entry) => ({ entry, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ entry }) => entry);

    setTimeout(() => {
      entries.map((e) => {
        shuffled.forEach((s, i) => {
          if (s.id === e.id) {
            e.style = { ...e.style, top: rowHeight * i + 'px' };
          }
        });
        return e;
      });
    }, 0);

    setTimeout(() => {
      shuffled.map((s) => {
        s.style = {};
        return s;
      });
      this.state.entries = shuffled;
      container.style.height = 'auto';
      container.classList.remove('animating');
    }, transitionTime);
  }
}
