import { SharedModule } from '@/app/shared/shared.module';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
    selector: 'app-canvas-widget',
    template: `
    <div class="w-full h-full p-4 relative">
        <nz-tabset [nzSelectedIndex]="selectedField?1:0">
            <nz-tab nzTitle="数据表">
                <div class="flex items-center mb-2">
                    <span class="text-black/45 mr-2 w-8">表名</span>
                    <input
                        class="flex-1"
                        nz-input
                        [(ngModel)]="config.entity.entityName"
                    />
                </div>
            </nz-tab>
            <nz-tab nzTitle="字段">
                <div class=" h-[calc(100%-2px)] overflow-auto">
                    <div class="flex items-center mb-2" *ngFor="let item of selectedField?[selectedField]:config.entity.entityProperties">
                        <nz-card style="width: 100%;" [nzTitle]="title" [nzExtra]="extra" nzHoverable > 
                        No Description     
                        </nz-card>
                        <ng-template #title>
                            <div class="flex items-center mb-2">
                                <span class="text-black/45 mr-2 w-8 text-[12px]">{{item.propertyName}}(<span>{{item.propertyType}}</span>)</span>
                            </div>
                        </ng-template>
                        <ng-template #extra>
                            <button nz-button nzType="link" (click)="showModal(item)">
                                <span nz-icon nzType="edit" nzTheme="outline"></span>
                            </button>
                        </ng-template>
                    </div>
                </div>
            </nz-tab>
        </nz-tabset>
    </div>
    <nz-modal [(nzVisible)]="isChangeField" nzTitle="更新字段" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()">
      <ng-container *nzModalContent>
            <div class="flex items-center mb-2">
                <span class="text-black/45 mr-2 w-8">字段名称</span>
                <input
                    class="flex-1"
                    nz-input
                    [(ngModel)]="fieldData.propertyName"
                />
            </div>
            <div class="flex items-center mb-2">
                <span class="text-black/45 mr-2 w-8">字段类型</span>
                <input
                    class="flex-1"
                    nz-input
                    [(ngModel)]="fieldData.propertyType"
                />
            </div>
            <div class="flex items-center mb-2">
                <span class="text-black/45 mr-2 w-8">主键</span>
                <nz-radio-group [(ngModel)]="fieldData.isPK" nzAutoFocus>
                  <span nz-radio [nzValue]='true'>是</span>
                  <span nz-radio [nzValue]='false'>否</span>
                </nz-radio-group>
            </div>
            <div class="flex items-center mb-2">
                <span class="text-black/45 mr-2 w-8">外键</span>
                <nz-radio-group [(ngModel)]="fieldData.isFK" nzAutoFocus>
                  <span nz-radio [nzValue]='true'>是</span>
                  <span nz-radio [nzValue]='false'>否</span>
                </nz-radio-group>
            </div>
      </ng-container>
    </nz-modal>
  `,
    styles: [``],
    imports: [SharedModule],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErWidget implements OnInit {
    @Input() config;

    @Input() plugin;

    selectedField = null;

    //编辑字段弹框 隐藏/现实
    isChangeField = false;
    //字段数据 用于编辑字段弹框显示字段信息
    fieldData: {
        propertyName: string;
        propertyType: string;
        isPK: boolean;
        isFK: boolean;
    };

    constructor(private cdr: ChangeDetectorRef) { }

    //控制编辑字段弹窗
    //显示
    showModal(data: any) {
        this.isChangeField = true;
        this.fieldData = data;
    }
    //关闭
    handleCancel() {
        this.isChangeField = false;
    }
    //提交
    handleOk() {
        //TODO 更改er-node节点组件数据
        this.isChangeField = false;
    }
    ngOnInit(): void {
        //为this.selectedField赋予首次选中字段值
        this.selectedField = this.config.field;
        //对后续选中字段数据变更进行监听
        this.config.selectedField.subscribe(field => {
            this.selectedField = field;
            this.cdr.detectChanges();
        });
    }
}
