import { Component, Input } from '@angular/core';
import { SharedModule } from '@/app/shared/shared.module';
import { ArrowMaps, ArrowStrokeMaps } from '@/app/flow-extension/editor-panel/components/constants';

@Component({
  selector: 'app-edge-widget',
  template: `
    <div class="p-4 relative">
      <div>
        <h5>内容</h5>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">标题</span>
          <input
            class="flex-1"
            nz-input
            [(ngModel)]="config.label"
            (ngModelChange)="onNodeConfigChange($event, 'label')"
          />
        </div>
      </div>
      <div>
        <h5>样式</h5>
        <h6>线</h6>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">箭头</span>
          <div class="flex-1 flex min-w-0">
            <nz-select
              class="w-full"
              [ngModel]="getArrowValue()"
              (ngModelChange)="onNodeConfigChange(ArrowMaps[$event], 'arrow', 'line')"
            >
              <nz-option nzLabel="正向" nzValue="target"></nz-option>
              <nz-option nzLabel="逆向" nzValue="source"></nz-option>
              <nz-option nzLabel="双向" nzValue="all"></nz-option>
              <nz-option nzLabel="无" nzValue="none"></nz-option>
            </nz-select>
          </div>
        </div>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">线形</span>
          <div class="flex-1 flex min-w-0">
            <nz-select
              class="w-full mr-2"
              [ngModel]="getStrokeDashValue()"
              (ngModelChange)="onNodeConfigChange(ArrowStrokeMaps[$event], 'strokeDasharray', 'line')"
            >
              <nz-option nzLabel="实线" nzValue="solid"></nz-option>
              <nz-option nzLabel="虚线" nzValue="dash"></nz-option>
            </nz-select>
            <nz-input-number
              [ngModel]="getAttrs('strokeWidth')"
              (ngModelChange)="onNodeConfigChange($event, 'strokeWidth', 'line')"
            />
          </div>
        </div>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">边框</span>
          <input
            nz-input
            class="w-10"
            type="color"
            [ngModel]="getAttrs('stroke')"
            (ngModelChange)="onNodeConfigChange($event, 'stroke', 'line')"
          />
        </div>
        <h6>标签</h6>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">字号</span>
          <nz-input-number
            class="w-16 mr-2"
            [ngModel]="getAttrs('fontSize', 'text') || 12"
            (ngModelChange)="onNodeConfigChange($event, 'fontSize', 'text')"
          />
          <input
            nz-input
            class="w-10"
            type="color"
            [ngModel]="getAttrs('fill', 'text') || '#000'"
            (ngModelChange)="onNodeConfigChange($event, 'fill', 'text')"
          />
        </div>
      </div>
    </div>
  `,
  styles: [``],
  imports: [SharedModule],
  standalone: true
})
export class EdgeWidget {
  @Input() config;

  @Input() plugin;

  protected readonly ArrowStrokeMaps = ArrowStrokeMaps;
  protected readonly ArrowMaps = ArrowMaps;

  getArrowValue = () => {
    const { attrs = {} } = this.config;
    const { line = {} } = attrs;
    if (line.sourceMarker?.name && line.targetMarker?.name) {
      return 'all';
    }
    if (!line.sourceMarker?.name && !line.targetMarker?.name) {
      return 'none';
    }
    if (line.sourceMarker?.name) {
      return 'source';
    }
    return 'target';
  };

  getStrokeDashValue = () => {
    const { attrs = {} } = this.config;
    const { line = {} } = attrs;
    return line.strokeDasharray ? 'dash' : 'solid';
  };

  getAttrs = (key: string, type = 'line') => {
    const { attrs = {} } = this.config;
    return attrs[type]?.[key];
  };

  onNodeConfigChange(value: number | string, key: string, type = 'line') {
    const { updateEdge } = this.plugin;
    const edgeConfig = this.config;
    if (key == 'arrow') {
      this.config = {
        ...edgeConfig,
        attrs: {
          ...edgeConfig.attrs,
          [type]: {
            ...edgeConfig.attrs?.[type],
            ...(value as any)
          }
        }
      };
    } else {
      this.config = {
        ...edgeConfig,
        [key]: value,
        attrs: {
          ...edgeConfig.attrs,
          [type]: {
            ...edgeConfig.attrs?.[type],
            [key]: value
          }
        }
      };
    }
    updateEdge(
      {
        [key]: value
      },
      type,
      key === 'arrow' ? 'arrow' : ''
    );
  }
}
