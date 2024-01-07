import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlowPage } from '@/app/pages/flow/flow.page';
import { XFlowCanvasComponent, XFlowComponent } from 'src/app/flow-core/components';

import {
  FlowChartCanvasComponent,
  FlowNodePanelComponent,
  BasePanelComponent,
  FlowNodeComponent
} from '@/app/flow-extension';
import {
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
  TextNode
} from '@/app/flow-extension/flow-chart/flow-node-panel/nodes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlowCanvasToolbarComponent } from './flow-extension/flow-chart/flow-canvas-toolbar/flow-canvas-toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FlowCanvasScaleToolbarComponent } from './flow-extension/flow-chart/flow-canvas-scale-toolbar/flow-canvas-scale-toolbar.component';
import { EditorPanelComponent } from './flow-extension/editor-panel/editor-panel.component';

import { SharedModule } from '@/app/shared/shared.module';
import { CanvasWidget, NodeWidget, EdgeWidget } from '@/app/flow-extension/editor-panel/components';

const COMPONENTS = [
  XFlowComponent,
  XFlowCanvasComponent,
  FlowChartCanvasComponent,
  FlowNodePanelComponent,
  BasePanelComponent,
  FlowNodeComponent,
  BasePanelComponent,
  FlowCanvasToolbarComponent,
  FlowCanvasScaleToolbarComponent,
  EditorPanelComponent
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
  TextNode
];

const EDITOR_STANDALONE_COMPONENTS = [NodeWidget, EdgeWidget, CanvasWidget];

@NgModule({
  declarations: [AppComponent, FlowPage, ...COMPONENTS, ...Nodes],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ...EDITOR_STANDALONE_COMPONENTS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
