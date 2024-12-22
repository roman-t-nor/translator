import { SaveProdService } from './save-prod.service';
import { SaveTestService } from './save-test.service';

export function SaveServiceFactory(isInTestMode: boolean) {
  return isInTestMode ? new SaveTestService() : new SaveProdService();
}
