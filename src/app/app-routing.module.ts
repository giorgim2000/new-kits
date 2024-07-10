import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ScreenManagerService } from './services/screen-manager.service';
import { DxButtonModule, DxContextMenuModule, DxDataGridModule, DxFileUploaderModule, DxFormModule, DxGalleryModule, DxListModule, DxLoadIndicatorModule, DxLoadPanelModule, DxMapModule, DxMenuModule, DxNumberBoxModule, DxPopupModule, DxScrollViewModule, DxSelectBoxModule, DxTextBoxModule, DxToastModule, DxTreeListModule, DxTreeViewModule } from 'devextreme-angular';
import { AuthFormComponent } from './pages/auth-form/auth-form.component';
import { LoginComponent } from './pages/auth-form/login/login.component';
import { CreateAccountComponent } from './pages/auth-form/create-account/create-account.component';
import { ChangePasswordComponent } from './pages/auth-form/change-password/change-password.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService, AuthService } from './services/auth.service';
import { ModelService } from './services/model.service';
import { ProductsComponent } from './pages/products/products.component';
import { AboutComponent } from './pages/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { MakesComponent } from './pages/admin-panel/makes/makes.component';
import { ModelsComponent } from './pages/admin-panel/models/models.component';
import { ModelsByYearComponent } from './pages/admin-panel/models-by-year/models-by-year.component';
import { ProductPanelComponent } from './pages/admin-panel/product-panel/product-panel.component';
import { OrdersComponent } from './pages/admin-panel/orders/orders.component';
import { UsersPanelComponent } from './pages/admin-panel/users-panel/users-panel.component';
import { ProductComponent } from './pages/product/product.component';
import { AuthComponent } from './pages/auth-form/auth/auth.component';
import { ProductModelGridComponent } from './components/product-model-grid/product-model-grid.component';
import { ProductImageGridComponent } from './components/product-image-grid/product-image-grid.component';
import { CartComponent } from './pages/cart/cart.component';
import { StoresComponent } from './pages/admin-panel/stores/stores.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CouriersComponent } from './pages/admin-panel/couriers/couriers.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'products',
    component: ProductsComponent,
  },
  {
    path: 'products/:id',
    component:ProductComponent
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
      },
      {
        path: 'signin',
        component: AuthComponent
      }
    ]
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    children:[
      {
        path: 'makes',
        component: MakesComponent
      },
      {
        path: 'models',
        component: ModelsComponent
      },
      {
        path: 'models-by-year',
        component: ModelsByYearComponent
      },
      {
        path: 'products',
        component: ProductPanelComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'users-panel',
        component: UsersPanelComponent
      },
      {
        path: 'stores',
        component: StoresComponent
      },
      {
        path: 'couriers',
        component: CouriersComponent
      }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent
  },
  {
    path:'myorders',
    component:MyOrdersComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxGalleryModule, DxTreeViewModule, DxTreeListModule,
    DxContextMenuModule,DxScrollViewModule,DxFormModule, DxLoadIndicatorModule, CommonModule,
    FormsModule, DxSelectBoxModule, DxTextBoxModule,DxButtonModule,DxNumberBoxModule,DxPopupModule, BrowserAnimationsModule, DxMenuModule,
    DxFileUploaderModule, DxDataGridModule, ReactiveFormsModule, DxLoadPanelModule, DxToastModule,DxListModule],
  exports: [RouterModule],
  declarations: [HomeComponent, AuthFormComponent, LoginComponent, CreateAccountComponent, ChangePasswordComponent, ProductsComponent, AdminPanelComponent,
    MakesComponent,ModelsComponent,ModelsByYearComponent,ProductPanelComponent,OrdersComponent,UsersPanelComponent, ProductComponent, AuthComponent, 
    ProductModelGridComponent,ProductImageGridComponent,CartComponent,StoresComponent, CheckoutComponent, CouriersComponent, MyOrdersComponent
  ],
  providers:[AuthService, ScreenManagerService, ModelService, AuthGuardService]
})
export class AppRoutingModule { }
