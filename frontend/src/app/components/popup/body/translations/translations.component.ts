import { Component } from '@angular/core';
import { StateService } from '@/services/state.service';
import { LoadingComponent } from '../../../loading/loading.component';

@Component({
  selector: 'popup-translations',
  standalone: true,
  templateUrl: 'translations.component.html',
  imports: [LoadingComponent],
})
export class TranslationsComponent {
  constructor(private state: StateService) {}

  get translations() {
    return this.state.currentEntry.translations;
  }

  get isTranslating() {
    return this.state.isTranslating;
  }
}
