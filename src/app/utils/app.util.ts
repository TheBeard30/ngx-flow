import { Application } from '@/app/models';

export const initApp = (graphProvider, commandService, modelService) => {
  const app = new Application(graphProvider, commandService, modelService);

  return app;
};
