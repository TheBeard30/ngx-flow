import { CommandInjectionToken, IGraphCommandService, IGraphProvider } from '@/app/interfaces';
import { Inject, Injectable } from '@angular/core';
import { CommandService, GraphProviderService, ModelService } from '@/app/services';
import { CommandContributionService } from '@/app/services/command-contribution.service';

@Injectable({ providedIn: 'root' })
export class Application {
  constructor(
    public graphProvider: GraphProviderService,
    public commandService: CommandService,
    public modelService: ModelService,
    public commandContributionService: CommandContributionService
  ) {}

  start() {
    // TODO 启动配置
    this.commandContributionService.start();
  }
}
