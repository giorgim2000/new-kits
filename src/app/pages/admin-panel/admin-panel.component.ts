import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenManagerService } from 'src/app/services/screen-manager.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit {
  menuDirection : any = "horizontal";
  menuItems = [
    { name: 'მარკები', selected: true },
    { name: 'მოდელები', selected: false },
    { name: 'მოდელები წლების მიხედვით', selected: false },
    { name: 'პროდუქტები', selected: false },
    { name: 'შეკვეთები', selected: false },
    { name: 'მომხმარებლები', selected: false },
    { name: 'საწყობები', selected: false },
    { name: 'კურიერები', selected: false }
  ]
  currentMenuItem = this.menuItems[0];

  menuItemClick(item : any){
    this.currentMenuItem = item.itemData;
    if(this.currentMenuItem.name === 'მარკები'){
      this.router.navigate(['admin-panel', 'makes']);
    }
    else if(this.currentMenuItem.name === 'მოდელები'){
      this.router.navigate(['admin-panel', 'models']);
    }
    else if(this.currentMenuItem.name === 'მოდელები წლების მიხედვით'){
      this.router.navigate(['admin-panel', 'models-by-year']);
    }
    else if(this.currentMenuItem.name === 'პროდუქტები')
      this.router.navigate(['admin-panel', 'products']);
    else if(this.currentMenuItem.name === 'შეკვეთები')
      this.router.navigate(['admin-panel', 'orders']);
    else if(this.currentMenuItem.name === 'მომხმარებლები')
      this.router.navigate(['admin-panel', 'users-panel']);
    else if(this.currentMenuItem.name === 'საწყობები')
      this.router.navigate(['admin-panel', 'stores']);
  }

  constructor(private router:Router, private screen : ScreenManagerService) { }

  ngOnInit(): void {
    this.updateMenu();
    this.screen.changed.subscribe(() => this.updateMenu());
    this.router.navigate(['admin-panel', 'makes']);
  }

  updateMenu(){
    if(this.screen.sizes['screen-large'])
      this.menuDirection = 'horizontal';
    else
      this.menuDirection = 'vertical';
  }
}
