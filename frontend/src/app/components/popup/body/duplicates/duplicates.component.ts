import { Component, Input } from '@angular/core';
import { Entry } from '@/Entry';

@Component({
  selector: 'duplicates',
  standalone: true,
  templateUrl: './duplicates.component.html',
})
export class DuplicatesComponent {
  @Input() entries: Entry[] = [];

  ngOnInit() {
    console.log(this.entries);
  }

  constructor() {
    console.log(2, this.entries);
  }
}
