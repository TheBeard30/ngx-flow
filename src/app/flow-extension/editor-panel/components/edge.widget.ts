import { Component } from '@angular/core';
import { SharedModule } from '@/app/shared/shared.module';

@Component({
  selector: 'app-edge-widget',
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
        <h6>线</h6>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">箭头</span>
          <div class="flex-1 flex min-w-0">
            <nz-select class="w-full">
              <nz-option nzLabel="正向"></nz-option>
              <nz-option nzLabel="逆向"></nz-option>
              <nz-option nzLabel="双向"></nz-option>
              <nz-option nzLabel="无"></nz-option>
            </nz-select>
          </div>
        </div>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">线形</span>
          <div class="flex-1 flex min-w-0">
            <nz-select class="w-full mr-2">
              <nz-option nzLabel="正向"></nz-option>
              <nz-option nzLabel="逆向"></nz-option>
              <nz-option nzLabel="双向"></nz-option>
              <nz-option nzLabel="无"></nz-option>
            </nz-select>
            <nz-input-number />
          </div>
        </div>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">边框</span>
          <input nz-input class="w-10" type="color" />
        </div>
        <h6>标签</h6>
        <div class="flex items-center mb-2">
          <span class="text-black/45 mr-2 w-8">字号</span>
          <nz-input-number class="w-16 mr-2" />
          <input nz-input class="w-10" type="color" />
        </div>
      </div>
    </div>
  `,
  styles: [``],
  imports: [SharedModule],
  standalone: true
})
export class EdgeWidget {}
