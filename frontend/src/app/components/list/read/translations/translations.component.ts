import { Component, Input } from '@angular/core';
import { LoadingComponent } from '@/components/loading/loading.component';

@Component({
  selector: 'translations',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './translations.component.html',
})
export class TranslationsComponent {
  @Input() translations?: string[];
  @Input() isEntryTranslating: boolean = false;
}
