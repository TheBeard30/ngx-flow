import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZORRO_MODULE } from '@/app/shared/zorro.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ...ZORRO_MODULE],
  exports: [CommonModule, FormsModule, ...ZORRO_MODULE]
})
export class SharedModule {}
