import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ScreenManagerService } from './services/screen-manager.service';
import { DxButtonModule, DxContextMenuModule, DxFormModule, DxGalleryModule, DxLoadIndicatorModule, DxNumberBoxModule, DxPopupModule, DxScrollViewModule, DxSelectBoxModule, DxTextBoxModule, DxTreeListModule, DxTreeViewModule } from 'devextreme-angular';
import { AuthFormComponent } from './pages/auth-form/auth-form.component';
import { LoginComponent } from './pages/auth-form/login/login.component';
import { CreateAccountComponent } from './pages/auth-form/create-account/create-account.component';
import { ChangePasswordComponent } from './pages/auth-form/change-password/change-password.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ModelService } from './services/model.service';
import { ProductsComponent } from './pages/products/products.component';
import { AboutComponent } from './pages/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'products',
    component: ProductsComponent
  },
  {
    path:'about',
    component: AboutComponent
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
  imports: [RouterModule.forRoot(routes), DxGalleryModule, DxTreeViewModule, DxTreeListModule,
    DxContextMenuModule,DxScrollViewModule,DxFormModule, DxLoadIndicatorModule, CommonModule,
    FormsModule, DxSelectBoxModule, DxTextBoxModule,DxButtonModule,DxNumberBoxModule,DxPopupModule, BrowserAnimationsModule],
  exports: [RouterModule],
  declarations: [HomeComponent, AuthFormComponent, LoginComponent, CreateAccountComponent, ChangePasswordComponent, ProductsComponent],
  providers:[AuthService, ScreenManagerService, ModelService]
})
export class AppRoutingModule { }
