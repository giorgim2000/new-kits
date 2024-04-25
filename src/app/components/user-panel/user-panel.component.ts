import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DxContextMenuModule, DxListModule } from 'devextreme-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [DxContextMenuModule, DxListModule],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss'
})
export class UserPanelComponent {
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
    text: 'ისტორია',
    icon: 'folder',
    onClick: () => {
      this.router.navigate(['/history']);
    }
  },
  {
    text: 'გამოსვლა',
    icon: 'runner',
    onClick: () => {
      this.authService.logOut();
    }
  }];

  constructor(private authService:AuthService,private router:Router){}
  
}