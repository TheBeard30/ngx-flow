import { XFlowGraphCommands } from '@/app/flow-core/constants';
import { CmdContext, XFlowEdgeCommands, XFlowNodeCommands } from '@/app/flow-core/commands';
import { Injectable } from '@angular/core';
import { NsGraph } from '@/app/flow-core/interfaces';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { Graph, Node, Edge } from '@antv/x6';
import { isEqual } from 'lodash';
import { IArgsBase } from '@/app/flow-core/commands/interface';

@Injectable({
  providedIn: 'root'
})
export class GraphRenderCommand {
  token: string = XFlowGraphCommands.GRAPH_RENDER.id;

  // 需要一个上下文
  ctx: CmdContext<NsGraphRender.IArgs, NsGraphRender.IResult, NsGraphRender.ICmdHooks>;

  async execute() {
    const { args, hooks: runtimeHook } = this.ctx.getArgs();
    const hooks = this.ctx.getHooks();
    await hooks.graphRender.call(
      args,
      async handlerArgs => {
        const x6Graph = await this.ctx.getX6Graph();
        // const graphMeta = await this.ctx.getGraphMeta()
        const { beforeRender, graphData, isNodeEqual, isEdgeEqual, afterRender } = handlerArgs;

        /** 如果用户自定义beforeRender方法 */
        // beforeRender && beforeRender(graphMeta)

        await this.doLoadGraph(x6Graph, graphData, isNodeEqual, isEdgeEqual);

        /** 如果用户自定义afterRender方法 */
        // afterRender && afterRender(graphData, graphMeta)

        return {};
      },
      runtimeHook
    );
  }

  async doLoadGraph(
    graph: Graph,
    graphData: NsGraph.IGraphData,
    isNodeEqual?: (curNode: NsGraph.INodeConfig, nextNode: NsGraph.INodeConfig) => boolean,
    isEdgeEqual?: (curEdge: NsGraph.IEdgeConfig, nextEdge: NsGraph.IEdgeConfig) => boolean
  ) {
    const commandService = this.ctx.getCommands();
    const { addNodeConfigs, addEdgeConfigs, removeNodes, removeEdges, updateNodes, updateEdges } = this.graphDataDiff(
      graph,
      graphData,
      isNodeEqual,
      isEdgeEqual
    );

    /** 更新节点/边 */
    for (const updateNode of updateNodes) {
      const nodeData = updateNode?.getData();
      await commandService.executeCommand(XFlowNodeCommands.UPDATE_NODE.id, {
        nodeConfig: nodeData
      });
    }
    for (const updateEdge of updateEdges) {
      const edgeData = updateEdge?.getData();
      await commandService.executeCommand(XFlowEdgeCommands.UPDATE_EDGE.id, {
        edgeConfig: edgeData
      });
    }

    /** 新增节点/边 */
    for (const nodeConfig of addNodeConfigs) {
      await commandService.executeCommand(
        XFlowNodeCommands.ADD_NODE.id,
        {
          nodeConfig,
          options: {
            isRenderGraph: true
          }
        },
        {
          name: 'remove servcie',
          handler: async args => {
            delete args.createNodeService;
          }
        }
      );
    }
    console.log('addEdgeConfigs>>>', addEdgeConfigs);
    for (const edgeConfig of addEdgeConfigs) {
      await commandService.executeCommand(
        XFlowEdgeCommands.ADD_EDGE.id,
        {
          edgeConfig,
          options: {
            isRenderGraph: true
          }
        },
        {
          name: 'remove servcie',
          handler: async args => {
            delete args.createEdgeService;
          }
        }
      );
    }
  }

  private graphDataDiff(
    graph: Graph,
    graphData: NsGraph.IGraphData,
    isNodeEqual?: (curNode: NsGraph.INodeConfig, nextNode: NsGraph.INodeConfig) => boolean,
    isEdgeEqual?: (curEdge: NsGraph.IEdgeConfig, nextNode: NsGraph.IEdgeConfig) => boolean
  ) {
    const { nodes: nodeConfigs, edges: edgeConfigs } = graphData;
    /** 新增节点 */
    const addNodeConfigs = [];
    for (const nodeConfig of nodeConfigs) {
      const node = graph.getCellById(nodeConfig?.id);
      if (!node) {
        addNodeConfigs.push(nodeConfig);
      }
    }
    const retainNodes: Node[] = [];
    const updateNodes: Node[] = [];
    const removeNodes: Node[] = [];
    const allNodes = graph.getNodes();
    for (const node of allNodes) {
      const findNodeConfig = nodeConfigs.find(n => n?.id === node?.id);
      if (!findNodeConfig) {
        removeNodes.push(node);
      } else {
        let judgeResult = true;
        if (isEdgeEqual) {
          /** 用户自定义节点是否相等的方法 */
          judgeResult = isNodeEqual(node?.data, findNodeConfig);
        } else {
          /** 默认的判断节点是否相等的逻辑 */
          if (node?.data && findNodeConfig) {
            judgeResult = NsGraphUtils.isNodeEqual(node?.data, findNodeConfig);
          }
        }
        if (!judgeResult) {
          node.setData(findNodeConfig, {
            deep: false
          });
        }
        judgeResult ? retainNodes.push(node) : updateNodes.push(node);
      }
    }

    /** 新增边数据 */
    const addEdgeConfigs: NsGraph.IEdgeConfig[] = [];
    console.log('edgeConfigs>>>', edgeConfigs);
    for (const edgeConfig of edgeConfigs) {
      const edge = graph.getCellById(edgeConfig?.id);
      if (!edge) {
        addEdgeConfigs.push(edgeConfig);
      }
    }
    /** 保持、更新、移除节点 */
    const retainEdges: Edge[] = [];
    const updateEdges: Edge[] = [];
    const removeEdges: Edge[] = [];
    const allEdges = graph.getEdges();
    for (const edge of allEdges) {
      const findEdgeConfig = edgeConfigs.find(e => e?.id === edge?.id);
      if (!findEdgeConfig) {
        removeEdges.push(edge);
      } else {
        let judgeResult = true;
        if (isEdgeEqual) {
          /** 用户自定义边是否相等的方法 */
          judgeResult = isEdgeEqual(edge?.data, findEdgeConfig);
        } else {
          /** 默认的判断边是否相等的逻辑 */
          if (edge?.data && findEdgeConfig) {
            judgeResult = NsGraphUtils.isEdgeEqual(edge?.data, findEdgeConfig);
          }
        }
        if (!judgeResult) {
          edge.setData(findEdgeConfig, {
            deep: false
          });
        }
        judgeResult ? retainEdges.push(edge) : updateEdges.push(edge);
      }
    }
    return {
      addNodeConfigs,
      addEdgeConfigs,
      retainNodes,
      retainEdges,
      removeNodes,
      removeEdges,
      updateNodes,
      updateEdges
    };
  }
}

export namespace NsGraphRender {
  /** Command: 用于注册named factory */
  export const command = XFlowGraphCommands.GRAPH_RENDER;

  /** hookName */
  export const hookKey = 'graphRender';

  export interface IArgs extends IArgsBase {
    /** 画布渲染之前的钩子(比如从服务端获取数据、对数据做布局处理等) */
    beforeRender?: (graphMeta?: NsGraph.IGraphMeta) => Promise<NsGraph.IGraphData>;
    /** 画布渲染完成之后的钩子 */
    afterRender?: (graphData: NsGraph.IGraphData, graphMeta?: NsGraph.IGraphMeta) => Promise<any> | undefined;

    /** 画布渲染数据(nodes、edges) */
    graphData: NsGraph.IGraphData;

    /** 用户自定义方法判断节点内容是否相等 */
    isNodeEqual?: (curNodeConfig: NsGraph.INodeConfig, nextNodeConfig: NsGraph.INodeConfig) => boolean;
    /** 用户自定义方法判断边内容是否相等 */
    isEdgeEqual?: (curEdgeConfig: NsGraph.IEdgeConfig, nextEdgeConfig: NsGraph.IEdgeConfig) => boolean;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface IResult {}

  /** hooks 类型 */
  export interface ICmdHooks extends IHooks {
    graphRender: HookHub<IArgs, IResult>;
  }
}

export namespace NsGraphUtils {
  export function isNodeEqual(curNodeConfig: NsGraph.INodeConfig, nextNodeConfig: NsGraph.INodeConfig) {
    /** XFlow默认的判断节点是否相等的逻辑 */
    return isEqual(curNodeConfig, nextNodeConfig);
  }

  export function isEdgeEqual(curEdgeConfig: NsGraph.IEdgeConfig, nextEdgeConfig: NsGraph.IEdgeConfig) {
    /** XFlow默认的判断边是否相等的逻辑 */
    return isEqual(curEdgeConfig, nextEdgeConfig);
  }
}
