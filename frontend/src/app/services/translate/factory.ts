import { TranslateProdService } from './translate-prod.service';
import { TranslateTestService } from './translate-test.service';

export function TranslateServiceFactory(isInTestMode: boolean) {
  return isInTestMode ? new TranslateTestService() : new TranslateProdService();
}
