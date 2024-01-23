import { Injectable } from '@angular/core';
import { CommandService, GraphProviderService, KeybindingService, ModelService } from '@/app/flow-core/services';
import { cellsToJson } from '@/app/flow-core/utils/app.util';
import { HookService } from '@/app/flow-core/services/hooks/hook.service';
import { IHooks } from '@/app/flow-core/hooks/interface';

@Injectable()
export class Application {
  constructor(
    public graphProvider: GraphProviderService,
    public commandService: CommandService,
    public modelService: ModelService,
    public hookService: HookService<IHooks>,
    public keybindingService: KeybindingService
  ) {}

  /**
   * 启动app
   */
  start() {
    // TODO 启动配置
    this.commandService.onStart();
    this.hookService.onStart();

    // TODO 整体流程需要修改
    setTimeout(() => {
      this.keybindingService.onStart();
      this.modelService.onStart();
    }, 1000);
  }

  /**
   * 获取画布实例
   */
  public getGraphInstance() {
    return this.graphProvider.getGraphInstance();
  }

  /**
   * 获取画布配置项
   */
  public getGraphConfig() {
    return this.graphProvider.getGraphOptions();
  }

  /**
   * 获取画布配置项
   */
  public getGraphData = async () => {
    const graph = await this.graphProvider.getGraphInstance();
    const cells = graph.getCells();
    return cellsToJson(cells);
  };

  /**
   * 获取画布所有节点
   */
  public getAllNodes = async () => {
    const graph = await this.graphProvider.getGraphInstance();
    return graph.getNodes();
  };

  /**
   * 获取画布节点
   */
  public getNodeById = async (nodeId: string) => {
    const graph = await this.graphProvider.getGraphInstance();
    return graph.getCellById(nodeId);
  };

  /** 获取画布所有连线 */
  public getAllEdges = async () => {
    const graph = await this.graphProvider.getGraphInstance();
    return graph.getEdges();
  };

  /** 获取画布连线 */
  public getEdgeById = async (edgeId: string) => {
    const graph = await this.graphProvider.getGraphInstance();
    return graph.getCellById(edgeId);
  };
}
