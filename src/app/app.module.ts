import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent, MainMenuModule } from './layout/main-menu/main-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ScreenManagerService } from './services/screen-manager.service';
import { LayoutModule } from '@angular/cdk/layout';
import { DxContextMenuModule } from 'devextreme-angular';
import { CreateAccountComponent } from './pages/auth-form/create-account/create-account.component';
import { AuthService } from './services/auth.service';
import { ModelService } from './services/model.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MainMenuModule,
    LayoutModule,
    DxContextMenuModule,
    BrowserAnimationsModule
  ],
  providers: [ScreenManagerService, AuthService, ModelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
