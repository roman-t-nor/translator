import { afterRender, Component, ElementRef } from '@angular/core';
import { MemorizeService } from '@/services/memorize.service';

@Component({
  selector: 'button-shuffle',
  standalone: true,
  templateUrl: 'button-shuffle.component.html',
  host: {
    '(click)': 'shuffle()',
  },
})
export class ButtonShuffleComponent {
  listHeight: number = 0;
  container: HTMLElement;

  constructor(
    public state: MemorizeService,
    private ref: ElementRef,
  ) {
    this.container = this.ref.nativeElement
      .closest('.row')
      .querySelector('.container');

    afterRender(() => {
      this.listHeight = this.container.offsetHeight;
    });
  }

  shuffle() {
    const transitionTime = 300;
    const rowHeight = this.listHeight / this.state.entries.length;
    this.container.style.height = this.listHeight + 'px';
    this.container.classList.add('animated');

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
      this.container.style.height = 'auto';
      this.container.classList.remove('animated');
    }, transitionTime);
  }
}
