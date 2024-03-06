import { NgModule } from '@angular/core';
import { SharedModule } from '@/app/shared/shared.module';
import { FlowChartCanvasComponent } from '@/app/flow-extension/flow-chart/flow-chart-canvas/flow-chart-canvas.component';
import { FlowNodePanelComponent } from '@/app/flow-extension/flow-chart/flow-node-panel/flow-node-panel.component';
import { BasePanelComponent } from '@/app/flow-extension/base-panel/base-panel.component';
import { FlowNodeComponent } from '@/app/flow-extension/flow-chart/flow-node-panel/flow-node.component';
import { FlowCanvasToolbarComponent } from '@/app/flow-extension/flow-chart/flow-canvas-toolbar/flow-canvas-toolbar.component';
import { FlowCanvasScaleToolbarComponent } from '@/app/flow-extension/flow-chart/flow-canvas-scale-toolbar/flow-canvas-scale-toolbar.component';
import { EditorPanelComponent } from '@/app/flow-extension/editor-panel/editor-panel.component';
import {
  ConnectorNode,
  DatabaseNode,
  DataIONode,
  DecisionNode,
  DelayNode,
  DisplayNode,
  DocumentNode,
  ExtractNode,
  HardDiskNode,
  InternalStorageNode,
  ManualInputNode,
  ManualOperationNode,
  MergeNode,
  MultiDocumentNode,
  NoteLeftNode,
  NoteRightNode,
  OffPageLinkNode,
  OrNode,
  PredefinedProcessNode,
  PreparationNode,
  ProcessNode,
  StroedDataNode,
  TerminalNode,
  TextNode
} from '@/app/flow-extension/flow-chart/flow-node-panel/nodes';
import { GroupNodeComponent } from '@/app/flow-extension/flow-chart/flow-node-panel/group/group.node.component';
import { CanvasWidget, EdgeWidget, NodeWidget, ErWidget } from '@/app/flow-extension/editor-panel/components';
import { FlowCoreModule } from '@/app/flow-core/flow-core.module';
import { ErCanvasComponent } from './er/er-canvas/er-canvas.component';
import { ErNodeComponent } from './er/er-node/er-node.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ErFieldComponent } from './er/er-node/er-field/er-field.component';
import { ErCanvasToolbarComponent } from './er/er-canvas-toolbar/er-canvas-toolbar.component';

import { ErTablePanelComponent } from './er/er-table-panel/er-table-panel.component';
import { FlowCustomNodePanelComponent } from './flow-chart/flow-node-panel/custom/flow-custom-node-panel.component';

const COMPONENTS = [
  FlowChartCanvasComponent,
  FlowNodePanelComponent,
  BasePanelComponent,
  FlowNodeComponent,
  FlowCustomNodePanelComponent,
  BasePanelComponent,
  FlowCanvasToolbarComponent,
  FlowCanvasScaleToolbarComponent,
  EditorPanelComponent,
  ErCanvasComponent,
  ErNodeComponent,
  ContextMenuComponent,
  ErCanvasToolbarComponent,
  ErFieldComponent,
  ErTablePanelComponent
];

const Nodes = [
  TerminalNode,
  ProcessNode,
  DecisionNode,
  MultiDocumentNode,
  ConnectorNode,
  DataIONode,
  DatabaseNode,
  HardDiskNode,
  StroedDataNode,
  DocumentNode,
  PredefinedProcessNode,
  ExtractNode,
  MergeNode,
  OrNode,
  ManualInputNode,
  PreparationNode,
  DelayNode,
  ManualOperationNode,
  DisplayNode,
  OffPageLinkNode,
  NoteLeftNode,
  NoteRightNode,
  InternalStorageNode,
  TextNode,
  GroupNodeComponent
];

const EDITOR_STANDALONE_COMPONENTS = [NodeWidget, EdgeWidget, CanvasWidget, ErWidget];

@NgModule({
  declarations: [...COMPONENTS, ...Nodes],
  imports: [SharedModule, FlowCoreModule, EDITOR_STANDALONE_COMPONENTS],
  exports: [...COMPONENTS],
  providers: []
})
export class FlowExtensionModule { }
