import { IGraphCommandService } from '@/app/interfaces';

export class Application {
  public graphProvider;

  public commandService: IGraphCommandService;

  public modelService;

  constructor(graphProvider, commandService, modelService) {
    this.graphProvider = graphProvider;
    this.commandService = commandService;
    this.modelService = modelService;
  }

  start() {
    // TODO 启动配置
  }
}
