import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZORRO_MODULE } from '@/app/shared/zorro.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ...ZORRO_MODULE],
  exports: [...ZORRO_MODULE]
})
export class SharedModule {}
