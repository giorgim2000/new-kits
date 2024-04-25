import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DxFormModule, DxLoadIndicatorModule } from 'devextreme-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loading = false;
  formData: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(e: Event) {
    e.preventDefault();
    const { email, password } = this.formData;
    //this.loading = true;

    // this.authService.logIn(email, password).subscribe({
    //   next: (res) => {
    //     if(res.isOk){
    //       this.router.navigate(['/home']);
    //     }
    //   },
    //   error: (err) => {
    //     console.log("CHUCHLIKA");
    //   }
    // });
    
    // if (!result.isOk) {
    //   this.loading = false;
    //   notify(result.message, 'error', 2000);
    // }
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  }
}
