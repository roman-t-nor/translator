import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Entry } from '@/Entry';
import { ButtonEraseComponent } from '../controls/button-erase/button-erase.component';
import { ButtonRemoveComponent } from '../controls/button-remove/button-remove.component';
import { FormService } from '@/services/form.service';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'form-row',
  standalone: true,
  templateUrl: 'form-row.component.html',
  imports: [ButtonEraseComponent, ButtonRemoveComponent, FormsModule, JsonPipe],
})
export class FormRowComponent implements OnInit {
  @Input() entry!: Entry;
  @Input() index!: number;
  @Output() remove = new EventEmitter<number>();
  private $fieldTranslateTo!: HTMLInputElement;

  constructor(
    private formService: FormService,
    private rootRef: ElementRef,
  ) {}

  get isCurrent() {
    return this.formService.currentEntryIndex$.getValue() === this.index;
  }

  get translations() {
    return this.entry.translations.join(', ');
  }

  set translations(value: string) {
    this.entry.translations = value.split(',').map((v) => v.trim());
  }

  ngOnInit() {
    this.$fieldTranslateTo = this.rootRef.nativeElement.querySelector(
      'input[name="translate_to[]"]',
    );
    if (this.index === 0) {
      this.$fieldTranslateTo.focus();
    }

    this.formService.selectedContentToCopyToTranslation$.subscribe(
      (content) => {
        if (this.isCurrent) {
          const input = this.$fieldTranslateTo;
          const selectionStart = input.selectionStart as number;
          const selectionEnd = input.selectionEnd as number;
          input.setRangeText(content, selectionStart, selectionEnd, 'end');
          input.focus();
        }
      },
    );
  }

  setCurrentEntryIndex() {
    this.formService.currentEntryIndex$.next(this.index);
  }

  onErase() {
    this.entry.translations.splice(-1);
    this.setCurrentEntryIndex();
    this.$fieldTranslateTo.focus();
  }

  onRemove() {
    this.remove.emit(this.index);
  }
}
