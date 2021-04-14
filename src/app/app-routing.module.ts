import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'list', loadChildren: () => import('./pages/users/list/list.module').then(m => m.ListModule) }, { path: 'edit', loadChildren: () => import('./pages/users/edit/edit.module').then(m => m.EditModule) }, { path: 'register', loadChildren: () => import('./pages/users/register/register.module').then(m => m.RegisterModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
