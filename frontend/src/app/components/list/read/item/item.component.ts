import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Entry } from '@/Entry';
import { CssClassesArrayToStringPipe } from '@/pipes/css-classes-array-to-string.pipe';
import { StateService } from '@/services/state.service';
import { TranslationsComponent } from '../translations/translations.component';

@Component({
  selector: 'item',
  standalone: true,
  imports: [CssClassesArrayToStringPipe, TranslationsComponent],
  templateUrl: './item.component.html',
})
export class ItemComponent implements OnInit {
  @Input() entry!: Entry;
  @Input() index!: number;
  $className: string[] = [];

  constructor(
    private state: StateService,
    private ref: ElementRef,
  ) {}

  get isCurrentEntry() {
    return this.state.currentEntryIndex === this.index;
  }

  get className() {
    this.$className = ['list_item m-2 fs-5'];
    if (this.isCurrentEntry) {
      this.$className.push('active');
    }

    if (this.state.respectListGroups && this.entry.lastInGroup) {
      this.$className.push('list_item_last');
    }

    return this.$className;
  }

  get isEntryTranslating(): boolean {
    return this.state.isTranslating && this.isCurrentEntry;
  }

  get isShowTranslations(): boolean {
    return !!this.entry.translations.length || this.isEntryTranslating;
  }

  ngOnInit(): void {
    this.state.currentEntryIndex$.subscribe(() => {
      this.scrollIntoView();
    });
    this.scrollIntoView();
  }

  scrollIntoView() {
    if (this.isCurrentEntry) {
      this.ref.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  handleClick() {
    this.state.setCurrentEntry(this.index);
  }
}
