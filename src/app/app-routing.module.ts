import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowPage } from '@/app/pages/flow/flow.page';
import { HomeComponent } from '@/app/pages/home/home.component';
import { ErComponent } from '@/app/pages/er/er.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'flow', component: FlowPage },
  { path: 'er', component: ErComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
