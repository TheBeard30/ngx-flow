import { Application } from '@/app/models';
import { Injector } from '@angular/core';

export const initApp = (injector: Injector) => {
  return injector.get(Application);
};
