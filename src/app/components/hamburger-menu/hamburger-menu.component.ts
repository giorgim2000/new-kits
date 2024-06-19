import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DxContextMenuModule, DxListModule } from 'devextreme-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [DxContextMenuModule, DxListModule, CommonModule],
  templateUrl: './hamburger-menu.component.html',
  styleUrl: './hamburger-menu.component.scss'
})
export class HamburgerMenuComponent implements OnInit{
  menuItems = [
    {
      text: 'პროდუქტები',
      icon: 'product',
      onClick: () => {
        this.router.navigate(['/profile']);
      }
    },
    {
      text: 'შოურუმი',
      icon: 'product',
      onClick: () => {
        this.router.navigate(['/profile']);
      }
    },
    {
      text: 'პროფილი',
      icon: 'user',
      onClick: () => {
        this.router.navigate(['/profile']);
      }
    },
    {
      text: 'ისტორია',
      icon: 'box',
      onClick: () => {
        this.router.navigate(['/history']);
      }
    },
    {
      text: 'ადმინ პანელი',
      icon: 'folder',
      onClick: () => {
        this.router.navigate(['/admin-panel']);
      }
    },
    {
      text: 'გამოსვლა',
      icon: 'runner',
      onClick: () => {
        this.authService.logout();
      }
    }
  ]

  constructor(private router:Router, private authService:AuthService){}

  ngOnInit(): void {
    if(this.authService.isLoggedIn$){
      
    }
  }
}
