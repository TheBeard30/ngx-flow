import { GraphProviderService, ModelService } from '@/app/flow-core/services';
import { Graph } from '@antv/x6';

export class CmdContext<Args = any> {
  /** x6 实例的缓存 */
  private graph: Graph;
  /** command 的参数 */
  private args: Args;
  /** hook */
  private runtimeHooks = [];
  constructor(
    // private commandService: IGraphCommandService,
    private graphProvider: GraphProviderService,
    private modelService: ModelService
  ) {}

  /** 获取Context Service */
  getModelService = () => {
    return this.modelService;
  };

  /** 获取Command Service */
  getCommands = () => {
    // return this.commandService;
  };

  /** 获取 graph */
  getGraphConfig = async () => {
    return this.graphProvider.getGraphOptions();
  };

  getX6Graph = async () => {
    if (this.graph) return this.graph;
    const instance = await this.graphProvider.getGraphInstance();
    this.graph = instance;
    return instance;
  };

  /**
   * 设置参数  hook的用法还要研究
   * @param args
   * @param runtimeHooks
   */
  setArgs(args: Args, runtimeHooks = []) {
    this.args = args;
    this.runtimeHooks = runtimeHooks;
  }

  getArgs() {
    /** 注入graph meta */
    const args = {
      ...this.args,
      modelService: this.getModelService(),
      commandService: this.getCommands(),
      // getGraphMeta: this.getGraphMeta,
      getX6Graph: this.getX6Graph,
      getGraphConfig: this.getGraphConfig
    };
    return { args: args };
  }
}
