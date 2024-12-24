import { inject, Injectable } from '@angular/core';
import { SaveService } from './save.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateService } from '@/services/state.service';
import { DbElementType } from '@/types/db';

@Injectable()
export class SaveProdService extends SaveService {
  http = inject(HttpClient);
  state = inject(StateService);

  save(event: Event): Observable<DbElementType[]> {
    const url = `sections/${this.state.sectionId}/elements`;
    const form = event.target as HTMLFormElement;
    return this.http.post<DbElementType[]>(url, new FormData(form));
  }
}
