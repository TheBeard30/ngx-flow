import { Component } from '@angular/core';
import { SharedModule } from '@/app/shared/shared.module';

@Component({
  selector: 'app-node-widget',
  template: `
    <div class="p-4 relative">
      <div>
        <h5>内容</h5>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">标题</span>
          <input class="flex-1" nz-input />
        </div>
      </div>
      <div>
        <h5>样式</h5>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">位置</span>
          <div class="flex-1 flex min-w-0">
            <nz-input-number-group class="mr-2" nzAddOnAfter="X">
              <nz-input-number />
            </nz-input-number-group>
            <nz-input-number-group nzAddOnAfter="Y">
              <nz-input-number />
            </nz-input-number-group>
          </div>
        </div>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">尺寸</span>
          <div class="flex-1 flex min-w-0">
            <nz-input-number-group class="mr-2" nzAddOnAfter="W">
              <nz-input-number />
            </nz-input-number-group>
            <nz-input-number-group nzAddOnAfter="H">
              <nz-input-number />
            </nz-input-number-group>
          </div>
        </div>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">填充</span>
          <input nz-input class="w-10" type="color" />
        </div>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">边框</span>
          <input nz-input class="w-10" type="color" />
        </div>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">字号</span>
          <nz-input-number class="w-16 mr-2" />
          <input nz-input class="w-10" type="color" />
        </div>
      </div>
    </div>
  `,
  styles: [``],
  standalone: true,
  imports: [SharedModule]
})
export class NodeWidget {}
