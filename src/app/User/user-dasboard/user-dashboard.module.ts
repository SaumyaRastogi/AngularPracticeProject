import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModuleModule } from 'src/app/SharedModule/shared-module/shared-module.module';
import { ProfilePageComponent } from 'src/app/SharedModule/Profile/profile-page/profile-page.component';
import { AdminDashboardModule } from 'src/app/Admin/admin-dashboard-module/admin-dashboard.module';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from 'src/app/Admin/edit-user/edit-user.component';
import { DataManagementService } from 'src/app/Services/DataManagement/data-management.service';

const routes: Routes = [
  {
    path: 'userDash',
    component: UserDashboardComponent,
    children: [
      {
        path: 'profile',
        component: ProfilePageComponent,
      },
      {
        path: 'editProfile',
        component: UserEditComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [UserDashboardComponent, UserEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModuleModule,
    AdminDashboardModule,
    ReactiveFormsModule,
    FormsModule,
  ],
   providers :[DataManagementService]
})
export class UserDashboardModule {
  constructor() {
    console.log('User dashboard loaded');
  }
}
