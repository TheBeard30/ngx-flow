import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlowPage } from '@/app/pages/flow/flow.page';
import { XFlowCanvasComponent, XFlowComponent } from '@/app/components';
import { CommandInjectionToken } from '@/app/interfaces';
import { CommandService } from '@/app/services';

const COMPONENTS = [XFlowComponent, XFlowCanvasComponent];

@NgModule({
  declarations: [AppComponent, FlowPage, ...COMPONENTS],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: CommandInjectionToken, useClass: CommandService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
