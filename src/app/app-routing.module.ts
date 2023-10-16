import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XFlowPage } from '@/app/pages/x-flow/x-flow.page';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'x-flow' },
  { path: 'x-flow', component: XFlowPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
