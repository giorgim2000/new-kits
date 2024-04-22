import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DxDrawerComponent, DxDrawerModule, DxListModule, DxMenuModule, DxToolbarModule } from 'devextreme-angular';
import { ScreenManagerService } from 'src/app/services/screen-manager.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  @ViewChild(DxDrawerComponent, { static: false }) drawer?: DxDrawerComponent;
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

  constructor(private router:Router, private screen:ScreenManagerService) { }

  ngOnInit(): void {
    this.screen.changed.subscribe(() => this.updateDrawer());
  }

  updateDrawer() {
    const isXSmall = this.screen.sizes['screen-x-small'];
    const isLarge = this.screen.sizes['screen-large'];

    this.isSmall = isXSmall;
    this.islarge = isLarge;
  }

  goto(e:any){
    console.log(e);
    this.router.navigate(['home']);
  }

  hamburgerClick(){
    this.drawer?.instance.toggle();
  }
}

@NgModule({
  imports:[CommonModule, DxToolbarModule, DxDrawerModule, DxMenuModule, DxListModule],
  exports:[MainMenuComponent],
  declarations:[MainMenuComponent],
  providers:[ScreenManagerService]
})
export class MainMenuModule { }