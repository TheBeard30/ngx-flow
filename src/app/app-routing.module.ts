import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowPage } from '@/app/pages/flow/flow.page';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'flow' },
  { path: 'flow', component: FlowPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
