import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './HomeModule/Home/home-page/home-page.component';
import { AuthgaurdGuard } from './shared/authgaurd.guard';
import { LoginFormComponent } from './HomeModule/Login/login-form/login-form.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthgaurdGuard],
    data: { role: 'admin' },
    loadChildren: () =>
      import('./Admin/admin-dashboard-module/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
    pathMatch: 'prefix',
  },
  {
    path: 'user',
    canActivate: [AuthgaurdGuard],
    data: { role: 'user' },
    loadChildren: () =>
      import('./User/user-dasboard/user-dashboard.module').then(
        (m) => m.UserDashboardModule
      ),
    pathMatch: 'prefix',
  },
  {
    path: '',
    loadChildren: () =>
      import('./HomeModule/home-module/home-module.module').then(
        (m) => m.HomeModuleModule
      ),
    pathMatch: 'prefix',
  },
  {
    path: '**',
    redirectTo : ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
