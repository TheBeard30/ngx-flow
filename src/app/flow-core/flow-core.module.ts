import { NgModule } from '@angular/core';
import { SharedModule } from '@/app/shared/shared.module';
import { XFlowCanvasComponent, XFlowComponent } from '@/app/flow-core/components';

const COMPONENTS = [XFlowComponent, XFlowCanvasComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [SharedModule],
  exports: [...COMPONENTS]
})
export class FlowCoreModule {}
