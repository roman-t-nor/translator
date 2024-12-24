import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, EMPTY, map, Observable, tap, throwError } from 'rxjs';
import { inject, isDevMode } from '@angular/core';
import { MessageService } from '@/services/message.service';
import { DEVELOPMENT_DOMAIN } from '@/app.config';

export function baseInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const messageService = inject(MessageService);

  const developmentDomain = inject<string>(DEVELOPMENT_DOMAIN);
  const domain = isDevMode() ? developmentDomain : '';

  let url = `${domain}/admin/api`;
  url = req.url ? `${url}/${req.url}` : url;
  const cloneReq = req.clone({ url });

  // console.log('METHOD:', req.method, ',  URL:', url);

  return next(cloneReq).pipe(
    catchError((event) => {
      let message = event.statusText;
      if (event.error.errors) {
        let details = `<hr/>` + Object.values(event.error.errors).join('<br/>');
        message += `<b>${details}</b>`;
      }
      if (event.error.error) {
        message += `<hr/>${event.error.error}`;
      }
      messageService.sendError(message);
      return EMPTY;
    }),
  );
}
