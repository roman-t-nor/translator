import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
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

  let url = `${domain}/api`;
  url = req.url ? `${url}/${req.url}` : url;
  const cloneReq = req.clone({ url, withCredentials: true });

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
