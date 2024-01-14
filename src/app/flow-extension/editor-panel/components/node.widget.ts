import { Component, Input } from '@angular/core';
import { SharedModule } from '@/app/shared/shared.module';

@Component({
  selector: 'app-node-widget',
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
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">位置</span>
          <div class="flex-1 flex min-w-0">
            <nz-input-number-group class="mr-2" nzAddOnAfter="X">
              <nz-input-number [(ngModel)]="config.x" (ngModelChange)="onNodeConfigChange($event, 'x')" />
            </nz-input-number-group>
            <nz-input-number-group nzAddOnAfter="Y">
              <nz-input-number [(ngModel)]="config.y" (ngModelChange)="onNodeConfigChange($event, 'y')" />
            </nz-input-number-group>
          </div>
        </div>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">尺寸</span>
          <div class="flex-1 flex min-w-0">
            <nz-input-number-group class="mr-2" nzAddOnAfter="W">
              <nz-input-number [(ngModel)]="config.width" (ngModelChange)="onNodeConfigChange($event, 'width')" />
            </nz-input-number-group>
            <nz-input-number-group nzAddOnAfter="H">
              <nz-input-number [(ngModel)]="config.height" (ngModelChange)="onNodeConfigChange($event, 'height')" />
            </nz-input-number-group>
          </div>
        </div>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">填充</span>
          <input
            nz-input
            class="w-10 p-1"
            type="color"
            [(ngModel)]="config.fill"
            (ngModelChange)="onNodeConfigChange($event, 'fill')"
          />
        </div>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">边框</span>
          <input
            nz-input
            class="w-10  p-1"
            type="color"
            [(ngModel)]="config.stroke"
            (ngModelChange)="onNodeConfigChange($event, 'stroke')"
          />
        </div>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">字号</span>
          <nz-input-number
            class="w-16 mr-2"
            [(ngModel)]="config.fontSize"
            (ngModelChange)="onNodeConfigChange($event, 'fontSize')"
          />
          <input
            nz-input
            class="w-10  p-1"
            type="color"
            [(ngModel)]="config.fontFill"
            (ngModelChange)="onNodeConfigChange($event, 'fontFill')"
          />
        </div>
      </div>
    </div>
  `,
  styles: [``],
  standalone: true,
  imports: [SharedModule]
})
export class NodeWidget {
  @Input() config;

  @Input() plugin;

  onNodeConfigChange(value: number | string, key: string) {
    const { updateNode } = this.plugin;
    updateNode({
      [key]: value
    });
  }
}
