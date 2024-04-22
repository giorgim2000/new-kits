import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ScreenManagerService } from './services/screen-manager.service';
import { DxGalleryModule, DxTreeViewModule } from 'devextreme-angular';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxGalleryModule, DxTreeViewModule],
  exports: [RouterModule],
  declarations: [HomeComponent]
})
export class AppRoutingModule { }
