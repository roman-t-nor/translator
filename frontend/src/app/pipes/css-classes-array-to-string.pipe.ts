import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cssClassesArrayToString',
  standalone: true,
})
export class CssClassesArrayToStringPipe implements PipeTransform {
  transform(value: string[]): string {
    return value.join(' ');
  }
}
