import { XFlowGraphCommands } from '@/app/flow-core/constants';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GraphLoadDataCommand {
  token: string = XFlowGraphCommands.LOAD_DATA.id;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  execute() {}
}
