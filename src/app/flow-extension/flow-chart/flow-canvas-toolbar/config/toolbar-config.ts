/* eslint-disable*/
import { NsGraphCmd, NsNodeCmd, NsGroupCmd } from '@/app/flow-core/commands';
import { XFlowGraphCommands, XFlowGroupCommands, XFlowNodeCommands } from '@/app/flow-core/constants';
import { IModelService } from '@/app/flow-core/interfaces/model.interface';
import { MODELS, uuidv4 } from '@/app/flow-core/models';
import { IToolbarItemOptions } from '@/app/flow-core/toolbar/interface';
import { GroupNodeComponent } from '../../flow-node-panel/group/group.node.component';
import { Injector } from '@angular/core';
import { register } from '@antv/x6-angular-shape';

const GROUP_NODE_RENDER_ID = 'GROUP_NODE_RENDER_ID';

export namespace TOOLBAR_ITEMS {
  export const BACK_NODE = XFlowNodeCommands.BACK_NODE.id;
  export const FRONT_NODE = XFlowNodeCommands.FRONT_NODE.id;
  export const SAVE_GRAPH_DATA = XFlowGraphCommands.SAVE_GRAPH_DATA.id;
  export const REDO_CMD = `${XFlowGraphCommands.REDO_CMD.id}`;
  export const UNDO_CMD = `${XFlowGraphCommands.UNDO_CMD.id}`;
  export const MULTI_SELECT = `${XFlowGraphCommands.GRAPH_TOGGLE_MULTI_SELECT.id}`;
  export const ADD_GROUP = `${XFlowGroupCommands.ADD_GROUP.id}`;
  export const DEL_GROUP = `${XFlowGroupCommands.DEL_GROUP.id}`;
  export const COPY = `${XFlowGraphCommands.GRAPH_COPY.id}`;
  export const PASTE = `${XFlowGraphCommands.GRAPH_PASTE.id}`;
}

export namespace NSToolbarConfig {
  /**toolbar依赖的状态 */
  export interface IToolbarState {
    isMultiSelectionActive: boolean;
    isGroupSelected: boolean;
    isNodeSelected: boolean;
    isUndoable: boolean;
    isRedoable: boolean;
  }
  //注册group节点
  export const initToolbar = async (injector: Injector) => {
    register({
      shape: GROUP_NODE_RENDER_ID,
      width: 180,
      height: 40,
      content: GroupNodeComponent,
      injector: injector
    });
  };
  /** toolbar依赖的状态 */
  export const getToolbarState = async (modelService: IModelService) => {
    // isMultiSelectionActive
    const { isEnable: isMultiSelectionActive } = await MODELS.GRAPH_ENABLE_MULTI_SELECT.useValue(modelService);
    // isGroupSelected
    const isGroupSelected = await MODELS.IS_GROUP_SELECTED.useValue(modelService);
    // isNormalNodesSelected: node不能是GroupNode
    const isNormalNodesSelected = await MODELS.IS_NORMAL_NODES_SELECTED.useValue(modelService);
    // undo redo
    const isUndoable = await MODELS.COMMAND_UNDOABLE.useValue(modelService);
    const isRedoable = await MODELS.COMMAND_REDOABLE.useValue(modelService);

    return {
      isUndoable,
      isRedoable,
      isNodeSelected: isNormalNodesSelected,
      isGroupSelected,
      isMultiSelectionActive
    } as NSToolbarConfig.IToolbarState;
  };
  export const getDependencies = async (modelService: IModelService) => {
    return [
      await MODELS.SELECTED_NODES.getModel(modelService),
      await MODELS.GRAPH_ENABLE_MULTI_SELECT.getModel(modelService)
    ];
  };

  export const getToolbarItems = async (state: IToolbarState) => {
    const toolbarGroup: IToolbarItemOptions[] = [];

    //节点置前
    toolbarGroup.push({
      tooltip: '置前',
      iconName: 'vertical-align-top',
      id: TOOLBAR_ITEMS.FRONT_NODE,
      //TODO 根据传入类行为IToolbarState的参数判断
      isEnabled: state.isNodeSelected,
      onClick: async ({ commandService, modelService }) => {
        const node = await MODELS.SELECTED_NODE.useValue(modelService);
        commandService.executeCommand<NsNodeCmd.FrontNode.IArgs>(TOOLBAR_ITEMS.FRONT_NODE, {
          nodeId: node?.id
        });
      }
    });
    //节点置后
    toolbarGroup.push({
      tooltip: '置后',
      iconName: 'vertical-align-bottom',
      id: TOOLBAR_ITEMS.BACK_NODE,
      isEnabled: state.isNodeSelected,
      onClick: async ({ commandService, modelService }) => {
        const node = await MODELS.SELECTED_NODE.useValue(modelService);
        commandService.executeCommand<NsNodeCmd.BackNode.IArgs>(TOOLBAR_ITEMS.BACK_NODE, {
          nodeId: node?.id
        });
      }
    });
    //开启框选
    toolbarGroup.push({
      tooltip: '开启框选',
      iconName: 'gateway',
      id: TOOLBAR_ITEMS.MULTI_SELECT,
      isEnabled: true,
      //TODO active为X6提供的react IToolbarItemOptions 父类型中属性
      active: true,
      onClick: async ({ commandService }) => {
        commandService.executeCommand<NsGraphCmd.GraphToggleMultiSelect.IArgs>(TOOLBAR_ITEMS.MULTI_SELECT, {});
      }
    });
    //新建群组
    toolbarGroup.push({
      tooltip: '新建群组',
      iconName: 'group',
      id: TOOLBAR_ITEMS.ADD_GROUP,
      isEnabled: true,
      onClick: async ({ commandService, modelService }) => {
        const cells = await MODELS.SELECTED_CELLS.useValue(modelService);
        const groupChildren = cells.map(cell => cell.id);
        commandService.executeCommand<NsGroupCmd.AddGroup.IArgs>(TOOLBAR_ITEMS.ADD_GROUP, {
          nodeConfig: {
            id: uuidv4(),
            shape: GROUP_NODE_RENDER_ID,
            groupChildren,
            groupCollapsedSize: { width: 200, height: 40 },
            label: '新建群组'
          }
        });
      }
    });
    //解散群组
    toolbarGroup.push({
      tooltip: '解散群组',
      iconName: 'ungroup',
      id: TOOLBAR_ITEMS.DEL_GROUP,
      isEnabled: true,
      onClick: async ({ commandService, modelService }) => {
        const cell = await MODELS.SELECTED_NODE.useValue(modelService);
        const nodeConfig = cell.getData();
        commandService.executeCommand<NsGroupCmd.AddGroup.IArgs>(XFlowGroupCommands.DEL_GROUP.id, {
          nodeConfig: nodeConfig
        });
      }
    });
    //保存
    toolbarGroup.push({
      tooltip: '保存',
      iconName: 'save',
      id: TOOLBAR_ITEMS.SAVE_GRAPH_DATA,
      isEnabled: true,
      onClick: async ({ commandService }) => {
        commandService.executeCommand<NsGraphCmd.SaveGraphData.IArgs>(TOOLBAR_ITEMS.SAVE_GRAPH_DATA, {
          saveGraphDataService: (meta, graphData) => {
            console.log(graphData);
            return null;
          }
        });
      }
    });

    return toolbarGroup;
  };
}
