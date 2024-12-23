import { inject, Injectable } from '@angular/core';
import { SaveService } from './save.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateService } from '@/services/state.service';

@Injectable()
export class SaveProdService extends SaveService {
  http = inject(HttpClient);
  state = inject(StateService);

  save(event: Event): Observable<string> {
    const url = `sections/${this.state.sectionId}/elements`;
    const form = event.target as HTMLFormElement;
    return this.http.post(url, new FormData(form), { responseType: 'text' });
  }
}
