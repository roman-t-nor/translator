import { afterRender, Component, ElementRef } from '@angular/core';
import { MemoService, StyledEntry } from '@/services/memo.service';
import { ControlsComponent } from '@/components/list/memo/controls/controls.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { PopupMemoComponent } from '@/components/list/memo/popup-memo/popup.component';
import { PopupService } from '@/services/popup.service';
import { PopupMemoEditComponent } from '@/components/list/memo/popup-edit/popup.component';
import { PopupMemoShowComponent } from '@/components/list/memo/popup-show/popup.component';
import { Entry } from '@/Entry';
import { Subscription } from 'rxjs';

@Component({
  selector: 'list-memo',
  standalone: true,
  templateUrl: './list-memo.component.html',
  styles: '.animating .item {font-weight: normal !important;}',
  imports: [
    ControlsComponent,
    AsyncPipe,
    NgIf,
    PopupMemoComponent,
    PopupMemoEditComponent,
    PopupMemoShowComponent,
  ],
})
export class ListMemoComponent {
  rows: HTMLElement[] = [];
  handlerKeyDown: (e: KeyboardEvent) => void;
  handlerWheel: (e: WheelEvent) => void;
  subscription: Subscription;

  constructor(
    public state: MemoService,
    public popupService: PopupService,
    private ref: ElementRef,
  ) {
    afterRender(() => {
      this.rows = this.ref.nativeElement.querySelectorAll('.row.item');
    });
    this.handlerKeyDown = this.onKeyDown.bind(this);
    this.handlerWheel = this.onWheel.bind(this);

    this.subscription = this.popupService.isOpen$.subscribe((value) => {
      if (value) {
        window.addEventListener('wheel', this.handlerWheel);
      } else {
        window.removeEventListener('wheel', this.handlerWheel);
      }
    });
  }

  get entries(): StyledEntry[] {
    return this.state.entries;
  }

  ngOnInit(): void {
    window.addEventListener('keydown', this.handlerKeyDown);

    this.state.currentEntryIndex$.subscribe((index) => {
      this.rows.forEach((r, i) => {
        if (i === index) {
          this.scrollIntoView(r);
        }
      });
    });

    this.state.getEntries();
  }

  scrollIntoView(e: HTMLElement) {
    e.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handlerKeyDown);
    window.removeEventListener('wheel', this.handlerWheel);
    this.subscription.unsubscribe();
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.state.isShowEditPopup) {
      return;
    }
    if (['ArrowLeft', 'ArrowUp'].includes(event.code)) {
      this.state.goPrevious();
      event.preventDefault();
    }
    if (['ArrowRight', 'ArrowDown', 'Space'].includes(event.code)) {
      this.state.goNext();
      event.preventDefault();
    }

    if (event.code === 'Enter') {
      if (this.popupService.isOpen()) {
        this.state.goNext();
      } else {
        if (event.ctrlKey) {
          this.state.isShowEditPopup = true;
        } else {
          this.state.isShowShowPopup = true;
        }
        this.popupService.show();
        event.preventDefault();
      }
    }
  }

  onWheel(event: WheelEvent) {
    if (this.state.isShowEditPopup) {
      return;
    }
    if (event.deltaY < 0) {
      this.state.goPrevious();
    } else {
      this.state.goNext();
    }
  }

  edit($event: MouseEvent, entry: Entry) {
    if ($event.ctrlKey) {
      this.state.isShowEditPopup = true;
    } else {
      this.state.isShowShowPopup = true;
    }
    this.state.currentEntry = entry;
    this.popupService.show();
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
