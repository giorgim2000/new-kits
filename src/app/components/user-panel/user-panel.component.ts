import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DxContextMenuModule, DxListModule } from 'devextreme-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [DxContextMenuModule, DxListModule,CommonModule],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss'
})
export class UserPanelComponent implements OnInit {
  @Input()
  username:string|undefined;

  @Input()
  menuMode!:string;

  menuItems = [{
    text: 'პროფილი',
    icon: 'user',
    onClick: () => {
      this.router.navigate(['/profile']);
    }
  },
  {
    text: 'გამოსვლა',
    icon: 'runner',
    onClick: () => {
      this.authService.logout();
    }
  }];

  myOrdersItem = {
    text: 'ისტორია',
    icon: 'box',
    onClick: () => {
      this.router.navigate(['/myorders']);
    }
  };

  adminPanelItem = {
    text: 'ადმინ პანელი',
    icon: 'folder',
    onClick: () => {
      this.router.navigate(['/admin-panel']);
    }
  };

  constructor(private authService:AuthService,private router:Router){}

  ngOnInit(): void {
    this.updateMenulist();
    this.authService.authChanged.subscribe(res => {
      this.updateMenulist();
    })
  }
  
  updateMenulist(){
    this.menuItems = this.menuItems.filter(item => item.text !== 'ისტორია' && item.text !== 'ადმინ პანელი');

    this.authService.isAdmin().subscribe(isAdmin => {
    if (isAdmin) {
      this.menuItems.splice(1, 0, this.adminPanelItem);
    } else if (this.authService.loggedIn) {
      this.menuItems.splice(1, 0, this.myOrdersItem);
    }
  });
  }
}
