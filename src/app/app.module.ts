import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModuleModule } from './SharedModule/shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateSetupModule } from './TranslateModule/translate.module';
import { DataManagementService } from './Services/DataManagement/data-management.service';
import { UserDashboardComponent } from './User/user-dashboard/user-dashboard.component';
import { JoinPipe } from './Pipe/Join.pipe';
import {
  GridModule,
} from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditUserComponent } from './Admin/edit-user/edit-user.component';
import { Observable } from 'rxjs';

export function initializeAppData(dataInitService: DataManagementService) {
  return (): Observable<any> => {
    return dataInitService.Init();
  };
}

@NgModule({
  declarations: [AppComponent, JoinPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    TranslateSetupModule,
    GridModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    DataManagementService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppData,
      deps: [DataManagementService],
      multi: true,
    },
  ],
  exports: [JoinPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
