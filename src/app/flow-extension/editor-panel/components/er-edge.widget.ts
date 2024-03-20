import { SharedModule } from '@/app/shared/shared.module';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-er-edge.widget',
  template: `<div>
    <nz-card nzTitle="表关系">
      <div class="mb-2">Source: <span class="text-blue-400 ml-1">{{this.config.source}}</span></div>
      <div class="mb-2">Target: <span class="text-blue-400 ml-1">{{this.config.target}}</span></div>
    </nz-card>
  </div>`,
  styles: [''],
  imports: [SharedModule],
  standalone: true
})
export class ErEdgeWidget {
  @Input() config;

  @Input() plugin;

}
