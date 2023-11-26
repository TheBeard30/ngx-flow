import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlowPage } from '@/app/pages/flow/flow.page';
import { XFlowCanvasComponent, XFlowComponent } from 'src/app/flow-core/components';
import { CommandInjectionToken } from 'src/app/flow-core/interfaces';
import { CommandService } from 'src/app/flow-core/services';
import { FlowChartCanvasComponent, FlowNodePanelComponent } from '@/app/flow-extension';
import { BasePanelComponent } from './flow-extension/base-panel/base-panel.component';

const COMPONENTS = [XFlowComponent, XFlowCanvasComponent, FlowChartCanvasComponent, FlowNodePanelComponent];

@NgModule({
  declarations: [AppComponent, FlowPage, ...COMPONENTS, BasePanelComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: CommandInjectionToken, useClass: CommandService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
