import { inject, Injectable } from '@angular/core';
import { SaveService } from './save.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SaveProdService extends SaveService {
  http = inject(HttpClient);

  save(event: Event): Observable<string> {
    const form = event.target as HTMLFormElement;
    return this.http.post<string>('', new FormData(form));
  }
}
