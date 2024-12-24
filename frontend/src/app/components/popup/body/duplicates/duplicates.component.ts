import { Component, Input } from '@angular/core';
import { DbElementType } from '@/types/db';

type DuplicateType = DbElementType & { isOdd: boolean };

@Component({
  selector: 'duplicates',
  standalone: true,
  templateUrl: './duplicates.component.html',
})
export class DuplicatesComponent {
  @Input() elements: DbElementType[] = [];
  entries: DuplicateType[] = [];

  ngOnInit() {
    if (!this.elements.length) {
      return;
    }
    let prevName = this.elements[0].name;
    let isOdd = true;
    this.entries = this.elements.map(
      (element: DbElementType, key: number): DuplicateType => {
        if (element.name !== prevName) {
          isOdd = !isOdd;
        }
        prevName = element.name;
        return { ...element, isOdd };
      },
    );
  }
}
