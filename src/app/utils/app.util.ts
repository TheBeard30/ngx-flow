import { Application } from '@/app/models';
import { Injector } from '@angular/core';

export const initApp = (injector: Injector) => {
  const app = injector.get(Application);

  return app;
};
