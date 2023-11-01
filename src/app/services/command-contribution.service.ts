import { hookHubList as graphHooks } from '@/app/commands/graph';
import { CommandService } from '@/app/services/command.service';

const list = [...graphHooks];

export class CommandContributionService {
  constructor(private commandService: CommandService) {}
  registerGraphCommands() {
    list.forEach(({ command }) => {});
  }
}
