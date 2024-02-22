import { SharedModule } from '@/app/shared/shared.module';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-canvas-widget',
    template: `
    <div class="w-full h-full p-4 relative">
        <div>
            <h2>数据表</h2>
            <div class="flex items-center mb-2">
                <span class="text-black/45 mr-2 w-8">表名</span>
                <input
                    class="flex-1"
                    nz-input
                    [(ngModel)]="config.entity.entityName"
                />
            </div>
        </div>
        <h2>字段</h2>
        <div class=" h-[calc(100%-2px)] overflow-auto">
            <div class="flex items-center mb-2" *ngFor="let item of config.entity.entityProperties">
                <nz-card style="width: 100%;" [nzTitle]="title" [nzExtra]="extra" nzHoverable > 
                No Description     
                </nz-card>
                <ng-template #title>
                    <div class="flex items-center mb-2">
                        <span class="text-black/45 mr-2 w-8 text-[12px]">{{item.propertyName}}(<span>{{item.propertyType}}</span>)</span>
                    </div>
                </ng-template>
                <ng-template #extra>
                    <button nz-button nzType="link">
                        <span nz-icon nzType="edit" nzTheme="outline"></span>
                    </button>
                </ng-template>
            </div>
        </div>
    </div>
  `,
    styles: [``],
    imports: [SharedModule],
    standalone: true
})
export class ErWidget implements OnInit {
    @Input() config;

    @Input() plugin;

    ngOnInit(): void {
        console.log('config', this.config);
    }

}
