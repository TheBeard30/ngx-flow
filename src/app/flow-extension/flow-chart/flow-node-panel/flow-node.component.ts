import { IGraphConfig } from '@/app/flow-core/interfaces';
import { AfterViewInit, Component, ElementRef, Injector, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { register } from '@antv/x6-angular-shape';



@Component({
  selector: 'app-flow-node',
  template: `
    <div nz-tooltip [nzTooltipTitle]="this.data.name"  nzTooltipPlacement="right" >
      <ng-template #container></ng-template>
    <div>
    `,
  styles: [``],
})
export class FlowNodeComponent implements AfterViewInit {


  @ViewChild('container', { read: ViewContainerRef }) viewRef: ViewContainerRef;

  @Input() config: IGraphConfig;

  @Input() data: any;

  constructor(private elementRef: ElementRef, private injector: Injector) { }

  ngAfterViewInit(): void {

    //动态创建节点组件,通过类型设置tooltip
    setTimeout(() => {
      const className = this.config.nodeRender.get(this.data.name);
      register({
        shape: this.data.name,
        width: this.data.width || 180,
        height: this.data.height || 40,
        content: className,
        injector: this.injector
      });
      const componentRef = this.viewRef.createComponent<any>(className);
      componentRef.instance.data.label = this.data.label;
    })
  }

}
