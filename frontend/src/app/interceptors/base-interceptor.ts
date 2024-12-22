import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  console.log('METHOD:', req.method, ',  URL:', url);

  return next(cloneReq);
  //     .pipe(
  //   map((event) => {
  //     if (event.type !== HttpEventType.Response) {
  //       return event;
  //     }
  //
  //     const body = event.body as ResponseType;
  //
  //     if (body.result === 'error') {
  //       throw new HttpErrorResponse({ statusText: body.message });
  //     }
  //
  //     return new HttpResponse({
  //       body: body.payload,
  //     });
  //   }),
  //
  //   catchError((event) => {
  //     messageService.sendError(event.statusText);
  //     return EMPTY;
  //   }),
  // );
}
