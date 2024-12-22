import { Component, ElementRef } from '@angular/core';
import { StateService } from '@/services/state.service';
import { LanguageFromType, LanguageToType } from '@/types/languages';

@Component({
  selector: 'languages',
  standalone: true,
  templateUrl: 'languages.component.html',
})
export class LanguagesComponent {
  constructor(
    private state: StateService,
    private ref: ElementRef,
  ) {}

  ngOnInit() {
    this.setLanguages();
  }

  setLanguages() {
    const target: HTMLFormElement = this.ref.nativeElement;
    const form = target.closest('form') as HTMLFormElement;
    const formData = new FormData(form);
    const from = formData.get('language-from') as LanguageFromType;
    const to1 = formData.get('language-to-1') as LanguageToType;
    const to2 = formData.get('language-to-2') as LanguageToType;
    const to = [to1];
    if (to2) {
      to.push(to2);
    }
    this.state.settingsLanguages = { from, to };
  }
}
