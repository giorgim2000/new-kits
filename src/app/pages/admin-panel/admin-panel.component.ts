import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit {
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
    

  }

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(['admin-panel', 'makes']);
  }
}
