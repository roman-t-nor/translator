import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateService } from '@/services/state.service';
import { FormService } from '@/services/form.service';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  isOpen$: BehaviorSubject<boolean>;
  isInSavingMode$: BehaviorSubject<boolean>;

  constructor(
    private state: StateService,
    private formService: FormService,
  ) {
    this.isOpen$ = new BehaviorSubject(false);
    this.isInSavingMode$ = new BehaviorSubject(false);
    this.state.currentEntryIndex$.subscribe(() =>
      this.isInSavingMode$.next(false),
    );
    window.addEventListener('mouseup', (event: MouseEvent) => {
      this.formService.handleMouseUp(event);
    });
    this.formService.isEntriesExist$.subscribe(
      (value: boolean) => value && this.isInSavingMode$.next(true),
    );

    // this.isInSavingMode$.next(true); // TEMP
  }

  show() {
    this.isOpen$.next(true);
  }
}
