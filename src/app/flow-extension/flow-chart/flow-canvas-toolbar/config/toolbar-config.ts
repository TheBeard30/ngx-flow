/* eslint-disable*/
import { XFlowGraphCommands, XFlowGroupCommands, XFlowNodeCommands } from "@/app/flow-core/constants"
import { IModelService } from "@/app/flow-core/interfaces/model.interface"
import { IToolbarItemOptions } from "@/app/flow-core/toolbar/interface"

const GROUP_NODE_RENDER_ID = 'GROUP_NODE_RENDER_ID'

export namespace TOOLBAR_ITEMS {
  export const BACK_NODE = XFlowNodeCommands.BACK_NODE.id
  export const FRONT_NODE = XFlowNodeCommands.FRONT_NODE.id
  export const SAVE_GRAPH_DATA = XFlowGraphCommands.SAVE_GRAPH_DATA.id
  export const REDO_CMD = `${XFlowGraphCommands.REDO_CMD.id}`
  export const UNDO_CMD = `${XFlowGraphCommands.UNDO_CMD.id}`
  export const MULTI_SELECT = `${XFlowGraphCommands.GRAPH_TOGGLE_MULTI_SELECT.id}`
  export const ADD_GROUP = `${XFlowGroupCommands.ADD_GROUP.id}`
  export const DEL_GROUP = `${XFlowGroupCommands.DEL_GROUP.id}`
  export const COPY = `${XFlowGraphCommands.GRAPH_COPY.id}`
  export const PASTE = `${XFlowGraphCommands.GRAPH_PASTE.id}`
}

namespace NSToolbarConfig{
    /**toolbar依赖的状态 */
    export interface IToolbarState{
        isMultiSelectionActive: boolean
        isGroupSelected: boolean
        isNodeSelected: boolean
        isUndoable: boolean
        isRedoable: boolean
    }
    
    
  
}
//TODO 无MODELS，暂时只实现外观
export const TOOLBAR_GROUP:IToolbarItemOptions[]=[
    {
        tooltip: '置前',
        iconName: 'vertical-align-top',
        id: TOOLBAR_ITEMS.FRONT_NODE,
        //TODO 根据传入类行为IToolbarState的参数判断
        isEnabled: true,
        // onClick: async ({ commandService, modelService }) => {
        //   const node = await MODELS.SELECTED_NODE.useValue(modelService)
        //   commandService.executeCommand<NsNodeCmd.FrontNode.IArgs>(TOOLBAR_ITEMS.FRONT_NODE, {
        //     nodeId: node?.id,
        //   })
        // },
    },
    {
        tooltip: '置后',
        iconName: 'vertical-align-bottom',
        id: TOOLBAR_ITEMS.BACK_NODE,
        isEnabled: true,
        // onClick: async ({ commandService, modelService }) => {
        //   const node = await MODELS.SELECTED_NODE.useValue(modelService)
        //   commandService.executeCommand<NsNodeCmd.FrontNode.IArgs>(TOOLBAR_ITEMS.BACK_NODE, {
        //     nodeId: node?.id,
        //   })
        // },
    },
    {
        tooltip: '开启框选',
        iconName: 'gateway', 
        id: TOOLBAR_ITEMS.MULTI_SELECT,
        //TODO active为X6提供的react IToolbarItemOptions 父类型中属性
        active: true,
        // onClick: async ({ commandService }) => {
        //   commandService.executeCommand<NsGraphCmd.GraphToggleMultiSelect.IArgs>(
        //     TOOLBAR_ITEMS.MULTI_SELECT,
        //     {},
        //   )
        // },
    },
     {
         tooltip: '新建群组',
         iconName: 'group',
         id: TOOLBAR_ITEMS.ADD_GROUP,
         isEnabled: true,
         // onClick: async ({ commandService, modelService }) => {
         //   const cells = await MODELS.SELECTED_CELLS.useValue(modelService)
         //   const groupChildren = cells.map(cell => cell.id)
         //   commandService.executeCommand<NsGroupCmd.AddGroup.IArgs>(TOOLBAR_ITEMS.ADD_GROUP, {
         //     nodeConfig: {
         //       id: uuidv4(),
         //       renderKey: GROUP_NODE_RENDER_ID,
         //       groupChildren,
         //       groupCollapsedSize: { width: 200, height: 40 },
         //       label: '新建群组',
         //     },
         //   })
         // },
     },
     {
         tooltip: '解散群组',
         iconName: 'ungroup',
         id: TOOLBAR_ITEMS.DEL_GROUP,
         isEnabled: true,
         // onClick: async ({ commandService, modelService }) => {
         //   const cell = await MODELS.SELECTED_NODE.useValue(modelService)
         //   const nodeConfig = cell.getData()
         //   commandService.executeCommand<NsGroupCmd.AddGroup.IArgs>(XFlowGroupCommands.DEL_GROUP.id, {
         //     nodeConfig: nodeConfig,
         //   })
         // },
     },
     {
         tooltip: '保存',
         iconName: 'save',
         id: TOOLBAR_ITEMS.SAVE_GRAPH_DATA,
         // onClick: async ({ commandService }) => {
         //   commandService.executeCommand<NsGraphCmd.SaveGraphData.IArgs>(
         //     TOOLBAR_ITEMS.SAVE_GRAPH_DATA,
         //     {
         //       saveGraphDataService: (meta, graphData) => {
         //         console.log(graphData)
         //         return null
         //       },
         //     },
         //   )
         // },
     },

];