import { Injectable } from '@angular/core';
import { SaveService } from './save.service';
import { delay, Observable, of } from 'rxjs';
import { DbElementType } from '@/types/db';

@Injectable()
export class SaveTestService extends SaveService {
  save(event: Event): Observable<DbElementType[]> {
    return of<DbElementType[]>([]).pipe(delay(1000));
  }
}
