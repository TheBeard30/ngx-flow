import { Component, Input } from '@angular/core';
import { SharedModule } from '@/app/shared/shared.module';

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
            <nz-select class="w-full" [ngModel]="getArrowValue()">
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
            <nz-select class="w-full mr-2" [ngModel]="getStrokeDashValue()">
              <nz-option nzLabel="实线"></nz-option>
              <nz-option nzLabel="虚线"></nz-option>
            </nz-select>
            <nz-input-number [ngModel]="getAttrs('strokeWidth')" />
          </div>
        </div>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">边框</span>
          <input nz-input class="w-10" type="color" [ngModel]="getAttrs('stroke')" />
        </div>
        <h6>标签</h6>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">字号</span>
          <nz-input-number class="w-16 mr-2" [ngModel]="getAttrs('fontSize', 'text')" />
          <input nz-input class="w-10" type="color" [ngModel]="getAttrs('fill', 'text')" />
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

  onNodeConfigChange(value: number | string, key: string) {
    const { updateEdge } = this.plugin;
    updateEdge({
      [key]: value
    });
  }
}
