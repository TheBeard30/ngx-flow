import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlowPage } from '@/app/pages/flow/flow.page';
import { XFlowCanvasComponent, XFlowComponent } from 'src/app/flow-core/components';
import { CommandInjectionToken } from 'src/app/flow-core/interfaces';
import { CommandService } from 'src/app/flow-core/services';
import { FlowChartCanvasComponent, FlowNodePanelComponent, BasePanelComponent } from '@/app/flow-extension';
import { NzIconModule } from 'ng-zorro-antd/icon';

const COMPONENTS = [
  XFlowComponent,
  XFlowCanvasComponent,
  FlowChartCanvasComponent,
  FlowNodePanelComponent,
  BasePanelComponent
];

@NgModule({
  declarations: [AppComponent, FlowPage, ...COMPONENTS, BasePanelComponent],
  imports: [BrowserModule, AppRoutingModule, NzIconModule],
  providers: [{ provide: CommandInjectionToken, useClass: CommandService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
