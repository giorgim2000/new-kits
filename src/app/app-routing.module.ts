import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ScreenManagerService } from './services/screen-manager.service';
import { DxContextMenuModule, DxFormModule, DxGalleryModule, DxLoadIndicatorModule, DxScrollViewModule, DxTreeListModule, DxTreeViewModule } from 'devextreme-angular';
import { AuthFormComponent } from './pages/auth-form/auth-form.component';
import { LoginComponent } from './pages/auth-form/login/login.component';
import { CreateAccountComponent } from './pages/auth-form/create-account/create-account.component';
import { ChangePasswordComponent } from './pages/auth-form/change-password/change-password.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth',
    component: AuthFormComponent,
    children:[
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: CreateAccountComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxGalleryModule, DxTreeViewModule, DxTreeListModule,DxContextMenuModule,DxScrollViewModule,DxFormModule, DxLoadIndicatorModule, CommonModule],
  exports: [RouterModule],
  declarations: [HomeComponent, AuthFormComponent, LoginComponent]
})
export class AppRoutingModule { }
