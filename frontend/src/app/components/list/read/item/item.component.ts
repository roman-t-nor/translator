import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Entry } from '@/Entry';
import { CssClassesArrayToStringPipe } from '@/pipes/css-classes-array-to-string.pipe';
import { TranslationsComponent } from '../translations/translations.component';
import { ReadService } from '@/services/read.service';

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
    private readService: ReadService,
    private ref: ElementRef,
  ) {}

  get isCurrentEntry() {
    return this.readService.currentEntryIndex === this.index;
  }

  get className() {
    this.$className = ['list_item m-2 fs-5'];
    if (this.isCurrentEntry) {
      this.$className.push('active');
    }

    if (this.readService.respectListGroups && this.entry.lastInGroup) {
      this.$className.push('list_item_last');
    }

    return this.$className;
  }

  get isEntryTranslating(): boolean {
    return this.readService.isTranslating && this.isCurrentEntry;
  }

  get isShowTranslations(): boolean {
    return !!this.entry.translations.length || this.isEntryTranslating;
  }

  ngOnInit(): void {
    this.readService.currentEntryIndex$.subscribe(() => {
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
    this.readService.setCurrentEntry(this.index);
  }
}
