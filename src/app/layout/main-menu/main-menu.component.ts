import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DxButtonModule, DxDrawerComponent, DxDrawerModule, DxListModule, DxMenuModule, DxToolbarModule } from 'devextreme-angular';
import { UserPanelComponent } from 'src/app/components/user-panel/user-panel.component';
import { AuthService } from 'src/app/services/auth.service';
import { ScreenManagerService } from 'src/app/services/screen-manager.service';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  @ViewChild(DxDrawerComponent, { static: false }) drawer?: DxDrawerComponent;
  loggedIn:boolean = false;
  user:any;
  toolbarContent : any[] = [{
    widget: 'dxButton',
    location: 'before',
    options: {
      icon: 'menu',
      stylingMode: 'text',
      onClick: () => {
        this.drawer?.instance.toggle()
      },
    },
  }];
  opt = {
    icon: 'menu',
    stylingMode: 'text',
    onClick: () => {
      this.drawer?.instance.toggle()
    },
  };
  isSmall = false;
  islarge= true;
  navigation = [
    { id: 1, text: 'Products' },
    { id: 2, text: 'Sales' },
    { id: 3, text: 'Customers' },
    { id: 4, text: 'Employees' },
    { id: 5, text: 'Reports' },
  ];

  constructor(private router:Router, private screen:ScreenManagerService, private authService:AuthService) { }

  ngOnInit(): void {
    this.screen.changed.subscribe(() => this.updateDrawer());
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
      if(isLoggedIn)
        this.user = this.authService.getUsername();
    });

    this.loggedIn = this.authService.loggedIn;
    if(this.loggedIn)
      this.user = this.authService.User;
  }

  updateDrawer() {
    const isXSmall = this.screen.sizes['screen-x-small'];
    const isLarge = this.screen.sizes['screen-large'];

    this.isSmall = isXSmall;
    this.islarge = isLarge;
  }

  logIn(){
    this.router.navigate(['auth', 'login']);
  }

  register(){
    this.router.navigate(['auth', 'register']);
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  goToProducts(){
    this.router.navigate(['products']);
  }

  goToShowroom(){
    this.router.navigate(['showroom']);
  }

  goToAbout(){
    this.router.navigate(['about']);
  }

  hamburgerClick(){
    this.drawer?.instance.toggle();
  }
}

@NgModule({
  imports:[CommonModule, DxToolbarModule, DxDrawerModule, DxMenuModule, DxListModule,UserPanelComponent, DxButtonModule],
  exports:[MainMenuComponent],
  declarations:[MainMenuComponent],
  providers:[ScreenManagerService]
})
export class MainMenuModule { }