import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlowPage } from '@/app/pages/flow/flow.page';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';

import { SharedModule } from '@/app/shared/shared.module';
import { ErComponent } from './pages/er/er.component';
import { FlowExtensionModule } from '@/app/flow-extension/flow-extension.module';
import { FlowCoreModule } from '@/app/flow-core/flow-core.module';
import { MenuToken, ModelToken } from '@/app/flow-core/providers/injection';
import { ContextMenuService } from '@/app/flow-extension/context-menu/context-menu.service';
import { CustomNodeComponent } from './pages/flow/custom-node/custom-node.component';

const PAGES = [FlowPage, HomeComponent, ErComponent];

@NgModule({
  declarations: [AppComponent, ...PAGES, CustomNodeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FlowExtensionModule,
    FlowCoreModule.forRoot()
  ],
  providers: [{ provide: ModelToken, useClass: ContextMenuService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
