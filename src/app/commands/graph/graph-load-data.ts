import { XFlowGraphCommands } from '@/app/constants';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GraphLoadDataCommand {
  token: string = XFlowGraphCommands.LOAD_DATA.id;
  execute() {}
}
