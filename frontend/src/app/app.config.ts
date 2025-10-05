import {
  ApplicationConfig,
  InjectionToken,
  provideZoneChangeDetection,
} from '@angular/core';
import { TranslateService } from './services/translate/translate.service';
import { TranslateServiceFactory } from './services/translate/factory';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseInterceptor } from './interceptors/base-interceptor';
import { SaveService } from '@/services/save/save.service';
import { SaveServiceFactory } from '@/services/save/factory';

export const DEVELOPMENT_DOMAIN = new InjectionToken<string>('');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([baseInterceptor])),
    {
      provide: DEVELOPMENT_DOMAIN,
      useValue: 'http://translator.loc',
    },
    { provide: 'isGetEntriesInTestMode', useValue: false },
    { provide: 'isTranslateServiceInTestMode', useValue: false },
    { provide: 'isSaveServiceInTestMode', useValue: false },
    {
      provide: TranslateService,
      useFactory: TranslateServiceFactory,
      deps: ['isTranslateServiceInTestMode'],
    },
    {
      provide: SaveService,
      useFactory: SaveServiceFactory,
      deps: ['isSaveServiceInTestMode'],
    },
    { provide: 'isMemoServiceInTestMode', useValue: false },
  ],
};
