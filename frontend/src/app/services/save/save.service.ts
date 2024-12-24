import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DbElementType } from '@/types/db';

@Injectable()
export abstract class SaveService {
  isSaving$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  abstract save(event: Event): Observable<DbElementType[]>;
}
