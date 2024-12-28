import { Component } from '@angular/core';
import { SaveService } from '@/services/save/save.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'button-save',
  standalone: true,
  templateUrl: 'button-save.component.html',
  imports: [NgIf],
})
export class ButtonSaveComponent {
  isShow: boolean = false;
  constructor(private saveService: SaveService) {
    this.saveService.isSaving$.subscribe(
      (value: boolean) => (this.isShow = !value),
    );
  }
}
