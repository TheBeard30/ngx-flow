import { Component } from '@angular/core';
import { SharedModule } from '@/app/shared/shared.module';

@Component({
  selector: 'app-node-widget',
  template: `
    <div>
      <div>
        <h5>内容</h5>
        <div class="flex">
          <span>标题</span>
          <input nz-input />
        </div>
      </div>
      <div>
        <h5>样式</h5>
        <div class="flex">
          <span>填充</span>
          <input nz-input type="color" />
        </div>
        <div class="flex">
          <span>边框</span>
          <input nz-input type="color" />
        </div>
        <div class="flex">
          <span>字号</span>
          <input nz-input />
          <input nz-input type="color" />
        </div>
      </div>
    </div>
  `,
  styles: [``],
  standalone: true,
  imports: [SharedModule]
})
export class NodeWidget {}
