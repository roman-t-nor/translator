import { Component } from '@angular/core';
import { SaveService } from '@/services/save/save.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'button-saving',
  standalone: true,
  templateUrl: 'button-saving.component.html',
  imports: [NgIf],
})
export class ButtonSavingComponent {
  isShow: boolean = false;
  constructor(private saveService: SaveService) {
    this.saveService.isSaving$.subscribe(
      (value: boolean) => (this.isShow = value),
    );
  }
}
