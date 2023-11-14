import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlowPage } from '@/app/pages/flow/flow.page';
import { XFlowCanvasComponent, XFlowComponent } from 'src/app/flow-core/components';
import { CommandInjectionToken } from 'src/app/flow-core/interfaces';
import { CommandService } from 'src/app/flow-core/services';

const COMPONENTS = [XFlowComponent, XFlowCanvasComponent];

@NgModule({
  declarations: [AppComponent, FlowPage, ...COMPONENTS],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: CommandInjectionToken, useClass: CommandService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
