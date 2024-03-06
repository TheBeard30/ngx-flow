import { AfterViewInit, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { IRegisterNode } from '../interface';
import { Dnd } from '@antv/x6-plugin-dnd';
import { GraphProviderService } from '@/app/flow-core/services';
import { FlowNodeComponent } from '@/app/flow-extension';
import { Graph } from '@antv/x6';
import { DefaultNodeConfig } from '../constant';

@Component({
  selector: 'app-flow-custom-node-panel',
  template: `
      <nz-collapse nzBordered="false">
        <nz-collapse-panel [nzHeader]="customPanel.title" nzActive>
          <div class="xflow-node-panel-official">
            <ng-template #templateRef></ng-template>
          </div>
        </nz-collapse-panel>
      </nz-collapse>
  `,
  styles: [`
  .xflow-node-panel-official{
  grid-gap: 5px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  cursor: grab;
  display: grid;
  grid-template-columns: repeat(4,minmax(24px,1fr));
}
`]
})
export class FlowCustomNodePanelComponent implements AfterViewInit {
  @Input() customPanel: IRegisterNode;
  @Input() dnd: Dnd;
  @Input() searchValue: string;

  @ViewChild('templateRef', { read: ViewContainerRef }) viewRef: ViewContainerRef;

  constructor(private graphProvider: GraphProviderService) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initNode()
    });
  }
  initNode() {

    this.customPanel.nodes.filter(
      //查询节点
      i => this.searchValue === undefined || i.label?.includes(this.searchValue) || i.name?.includes(this.searchValue)
    ).map(async n => {
      const config = await this.graphProvider.getGraphOptions();
      const graph = await this.graphProvider.getGraphInstance();
      // 动态创建flow-node，然后给他传递input属性
      const componentRef = this.viewRef.createComponent(FlowNodeComponent);
      componentRef.setInput('data', n);
      componentRef.setInput('config', config);
      // @ts-ignore
      const element = componentRef.instance.elementRef.nativeElement;
      element.onmousedown = async (ev: MouseEvent) => {
        const node = graph.createNode({ shape: n.name, ports: n.ports, width: n.width, height: n.height });
        const options = {} as any;
        if (n.label) {
          options.label = n.label;
          options.fill = 'transparent';
        }
        node.setData({
          ngArguments: {
            data: {
              stroke: DefaultNodeConfig.stroke,
              label: DefaultNodeConfig.label,
              fill: DefaultNodeConfig.fill,
              fontFill: DefaultNodeConfig.fontFill,
              fontSize: DefaultNodeConfig.fontSize,
              ...options
            },
            size: {
              width: n.width,
              height: n.height
            }
          }
        });
        node.getData().ngArguments.data.label = n.label;
        this.dnd.start(node, ev);
      };
      return {
        ...n,
        instance: componentRef.instance
      };
    });
  }

}

