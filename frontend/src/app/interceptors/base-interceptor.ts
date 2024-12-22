import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { ResponseType } from '@/types/response-type';
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

  const url = `${domain}/admin/api/`;
  const cloneReq = req.clone({ url });

  return next(cloneReq).pipe(
    map((event) => {
      if (event.type !== HttpEventType.Response) {
        return event;
      }

      const body = event.body as ResponseType;

      if (body.result === 'error') {
        throw new HttpErrorResponse({ statusText: body.message });
      }

      return new HttpResponse({
        body: body.payload,
      });
    }),

    catchError((event) => {
      messageService.sendError(event.statusText);
      return EMPTY;
    }),
  );
}
