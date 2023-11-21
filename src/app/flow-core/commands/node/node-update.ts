import { XFlowNodeCommands } from '@/app/flow-core/constants';
import { CmdContext } from '@/app/flow-core/commands';
import { Injectable } from '@angular/core';
import { IArgsBase } from '@/app/flow-core/commands/interface';
import { NsGraph } from '@/app/flow-core/interfaces';
import { Graph, Node } from '@antv/x6';
import { IHooks } from '@/app/flow-core/hooks/interface';
import { HookHub } from '@/app/flow-core/hooks/hookhub';
import { isBoolean } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UpdateNodeCommand {
  token: string = XFlowNodeCommands.UPDATE_NODE.id;

  ctx: CmdContext<NsUpdateNode.IArgs, NsUpdateNode.IResult, NsUpdateNode.ICmdHooks>;

  execute = async () => {
    const { args, hooks: runtimeHook } = this.ctx.getArgs();
    const hooks = this.ctx.getHooks();
    await hooks.updateNode.call(
      args,
      async handlerArgs => {
        const { options = NsUpdateNode.XFlowNodeSetOptions } = handlerArgs;
        const graph = await this.ctx.getX6Graph();
        const node = this.getNodeCell(graph, handlerArgs);
        const nextNodeConfig = await this.getNextNodeConfig(handlerArgs, node);
        this.setNodeConfig(node, nextNodeConfig, options);
        return {
          nodeConfig: nextNodeConfig,
          nodeCell: node
        };
      },
      runtimeHook
    );
  };

  setNodeConfig = (x6Node: Node, nodeConfig: NsGraph.INodeConfig, options: Node.SetOptions) => {
    x6Node.setData(nodeConfig, options);
    x6Node.setPosition(nodeConfig?.x || 0, nodeConfig?.y || 0);
    x6Node.setSize(nodeConfig?.width || NsUpdateNode.NODE_WIDTH, nodeConfig?.height || NsUpdateNode.NODE_HEIGHT);
    x6Node.angle(nodeConfig?.angle || 0, {
      absolute: true
    });

    if (isBoolean(nodeConfig?.visible)) {
      x6Node.setVisible(nodeConfig?.visible);
    }

    // SVG 元素更新label
    if (!!x6Node.getAttrByPath('text/text')) {
      x6Node.setAttrByPath('text/text', nodeConfig.label);
    }

    // 支持nodeAttrs
    if (nodeConfig.attrs) {
      x6Node.setAttrs(nodeConfig.attrs);
    }

    // 更新ports
    if (Array.isArray(nodeConfig.ports)) {
      x6Node.setPropByPath('ports/items', nodeConfig.ports, { rewrite: true, ...options });
    }
  };

  getNextNodeConfig = async (handlerArgs: NsUpdateNode.IArgs, node: Node) => {
    if (handlerArgs && handlerArgs.setNodeConfig && handlerArgs.setNodeConfig.callback) {
      const nodeData = this.getNodeConfig(node);
      return handlerArgs.setNodeConfig.callback(nodeData);
    }
    return handlerArgs.nodeConfig;
  };

  getNodeConfig = (x6Node: Node) => {
    const data = x6Node.getData();
    const position = x6Node.getPosition();
    const size = x6Node.getSize();
    return {
      ...data,
      ...position,
      ...size
    };
  };

  getNodeCell = (graph: Graph, handlerArgs: NsUpdateNode.IArgs) => {
    const { nodeConfig, setNodeConfig } = handlerArgs;
    let nodeId = '';
    if (setNodeConfig && setNodeConfig.node && typeof setNodeConfig.node === 'string') {
      nodeId = setNodeConfig.node;
    } else if (nodeConfig && nodeConfig.id && typeof nodeConfig.id === 'string') {
      nodeId = nodeConfig.id;
    }
    if (nodeId) {
      return graph?.getCellById(nodeId) as Node;
    }
    if (setNodeConfig && setNodeConfig.node instanceof Node) {
      return setNodeConfig.node;
    }
    return null;
  };
}

export namespace NsUpdateNode {
  export const command = XFlowNodeCommands.UPDATE_NODE;
  export const hookKey = 'updateNode';

  export interface IArgs extends IArgsBase {
    /** 节点的新元数据 */
    nodeConfig?: NsGraph.INodeConfig;
    /** 更新节点元数据 */
    setNodeConfig?: ISetNodeConfig;
    /** setOptions:https://x6.antv.vision/zh/docs/api/model/cell/#setdata */
    options?: Node.SetOptions;
    /** 更新节点的服务 */
    updateNodeService?: IUpdateNodeService;
  }

  export const XFlowNodeSetOptions: Node.SetOptions = { overwrite: true };
  export interface ISetNodeConfig {
    node: string | Node;
    callback: (node: NsGraph.INodeConfig) => Promise<NsGraph.INodeConfig>;
  }
  export interface IResult {
    nodeConfig: NsGraph.INodeConfig;
    nodeCell: Node;
  }

  export interface IUpdateNodeService {
    (args: IArgs): Promise<NsGraph.INodeConfig>;
  }

  export interface ICmdHooks extends IHooks {
    updateNode: HookHub<IArgs, IResult>;
  }

  export const NODE_WIDTH = 200;
  export const NODE_HEIGHT = 40;
}
