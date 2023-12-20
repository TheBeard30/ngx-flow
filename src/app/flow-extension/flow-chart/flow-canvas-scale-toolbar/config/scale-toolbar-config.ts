/* eslint-disable @typescript-eslint/no-namespace */
import { XFlowGraphCommands } from "@/app/flow-core/constants";
import { IToolbarItemOptions } from "@/app/flow-core/toolbar/interface";


export namespace CANVAS_SCALE_TOOLBAR_CONFIG {
  
    export const ZOOM_IN = XFlowGraphCommands.GRAPH_ZOOM.id + '-zoom-in'
    export const ZOOM_OUT = XFlowGraphCommands.GRAPH_ZOOM.id + '-zoom-out'
    export const SCALE_TO_ONE = XFlowGraphCommands.GRAPH_ZOOM.id + '-scale-to-one'
    export const SCALE_TO_FIT = XFlowGraphCommands.GRAPH_ZOOM.id + '-scale-to-fit'
    export const FULLSCREEN = XFlowGraphCommands.GRAPH_ZOOM.id + '-fullscreen'
  
    export const MAX_SCALE = 1.5
    export const MIN_SCALE = 0.05
  
    export const zoomOptions = {
      maxScale: MAX_SCALE,
      minScale: MIN_SCALE,
    }
}
export const SCALE_TOOLBAR_GROUP:IToolbarItemOptions[]=[
    {
      id: CANVAS_SCALE_TOOLBAR_CONFIG.ZOOM_IN,
      tooltip: '放大',
      iconName: 'zoom-in',
    //   onClick: ({ commandService }) => {
    //     commandService.executeCommand<NsGraphCmd.GraphZoom.IArgs>(
    //       XFlowGraphCommands.GRAPH_ZOOM.id,
    //       {
    //         factor: 0.1,
    //         zoomOptions: CANVAS_SCALE_TOOLBAR_CONFIG.zoomOptions,
    //       },
    //     )
    //   },
    },
    {
      id: CANVAS_SCALE_TOOLBAR_CONFIG.ZOOM_OUT,
      tooltip: '缩小',
      iconName: 'zoom-out',
    //   onClick: ({ commandService }) => {
    //     commandService.executeCommand<NsGraphCmd.GraphZoom.IArgs>(
    //       XFlowGraphCommands.GRAPH_ZOOM.id,
    //       {
    //         factor: -0.1,
    //         zoomOptions: CANVAS_SCALE_TOOLBAR_CONFIG.zoomOptions,
    //       },
    //     )
    //   },
    },
    {
      id: CANVAS_SCALE_TOOLBAR_CONFIG.SCALE_TO_ONE,
      iconName: 'one-to-one',
      tooltip: '缩放到1:1',
      isEnabled: true//zoomFactor !== 1,
    //   onClick: ({ commandService }) => {
    //     commandService.executeCommand<NsGraphCmd.GraphZoom.IArgs>(
    //       XFlowGraphCommands.GRAPH_ZOOM.id,
    //       {
    //         factor: 'real',
    //         zoomOptions: CANVAS_SCALE_TOOLBAR_CONFIG.zoomOptions,
    //       },
    //     )
    //   },
    },
    {
      id: CANVAS_SCALE_TOOLBAR_CONFIG.SCALE_TO_FIT,
      tooltip: '缩放到适应屏幕',
      iconName: 'compress',
    //   onClick: ({ commandService }) => {
    //     commandService.executeCommand<NsGraphCmd.GraphZoom.IArgs>(
    //       XFlowGraphCommands.GRAPH_ZOOM.id,
    //       {
    //         factor: 'fit',
    //         zoomOptions: CANVAS_SCALE_TOOLBAR_CONFIG.zoomOptions,
    //       },
    //     )
    //   },
    },
    {
      id: CANVAS_SCALE_TOOLBAR_CONFIG.FULLSCREEN,
      tooltip: '全屏',//!fullscreen ? '全屏' : '退出全屏',
      iconName: 'fullscreen'//!fullscreen ? 'fullscreen' : 'fullscreen-exit',
    //   onClick: ({ commandService }) => {
    //     commandService.executeCommand<NsGraphCmd.GraphFullscreen.IArgs>(
    //       XFlowGraphCommands.GRAPH_FULLSCREEN.id,
    //       {},
    //     )
    //   },
    },
  ]