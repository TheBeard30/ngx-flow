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
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
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
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlowCanvasToolbarComponent } from './flow-extension/flow-chart/flow-canvas-toolbar/flow-canvas-toolbar.component';
import { HttpClientModule } from '@angular/common/http';

const COMPONENTS = [
  XFlowComponent,
  XFlowCanvasComponent,
  FlowChartCanvasComponent,
  FlowNodePanelComponent,
  BasePanelComponent,
  FlowNodeComponent
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

@NgModule({
  declarations: [AppComponent, FlowPage, ...COMPONENTS, ...Nodes, BasePanelComponent, FlowCanvasToolbarComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, BrowserAnimationsModule, NzIconModule, NzCollapseModule,NzToolTipModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
