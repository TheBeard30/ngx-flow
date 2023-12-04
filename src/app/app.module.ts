import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlowPage } from '@/app/pages/flow/flow.page';
import { XFlowCanvasComponent, XFlowComponent } from 'src/app/flow-core/components';
import { CommandInjectionToken } from 'src/app/flow-core/interfaces';
import { CommandService } from 'src/app/flow-core/services';
import {
  FlowChartCanvasComponent,
  FlowNodePanelComponent,
  BasePanelComponent,
  FlowNodeComponent
} from '@/app/flow-extension';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TerminalNode } from '@/app/flow-extension/flow-chart/flow-node-panel/nodes';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const COMPONENTS = [
  XFlowComponent,
  XFlowCanvasComponent,
  FlowChartCanvasComponent,
  FlowNodePanelComponent,
  BasePanelComponent,
  FlowNodeComponent
];

const Nodes = [TerminalNode];

@NgModule({
  declarations: [AppComponent, FlowPage, ...COMPONENTS, ...Nodes, BasePanelComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, NzIconModule, NzCollapseModule],
  providers: [{ provide: CommandInjectionToken, useClass: CommandService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
