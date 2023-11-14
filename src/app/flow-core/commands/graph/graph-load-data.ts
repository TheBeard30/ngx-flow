import { XFlowGraphCommands } from '@/app/flow-core/constants';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GraphLoadDataCommand {
  token: string = XFlowGraphCommands.LOAD_DATA.id;
  execute() {}
}
