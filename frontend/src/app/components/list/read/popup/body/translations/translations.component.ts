import { Component } from '@angular/core';
import { ReadService } from '@/services/read.service';
import { LoadingComponent } from '@/components/loading/loading.component';

@Component({
  selector: 'popup-translations',
  standalone: true,
  templateUrl: 'translations.component.html',
  imports: [LoadingComponent],
})
export class TranslationsComponent {
  constructor(private readService: ReadService) {}

  get translations() {
    return this.readService.currentEntry.translations;
  }

  get isTranslating() {
    return this.readService.isTranslating;
  }
}
