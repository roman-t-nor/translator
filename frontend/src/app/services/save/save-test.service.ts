import { Injectable } from '@angular/core';
import { SaveService } from './save.service';
import { delay, Observable, of } from 'rxjs';

@Injectable()
export class SaveTestService extends SaveService {
  save(event: Event): Observable<string> {
    return of('response').pipe(delay(1000));
  }
}
