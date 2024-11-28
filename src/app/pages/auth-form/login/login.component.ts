import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DxFormModule, DxLoadIndicatorModule } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { firstValueFrom } from 'rxjs';
import { UserForAuthenticationDto } from 'src/app/Dto\'s/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loading = false;
  formData: any = {};
  showErrorMessage = false;

  constructor(private authService: AuthService, private router: Router) { }

  // onSubmit(e: Event) {
  //   e.preventDefault();
  //   const { email, password } = this.formData;
  //   this.loading = true;

  //   this.authService.logIn(email, password).subscribe({
  //     next: (res) => {
  //       if(res.isOk){
  //         this.loading = false;
  //         this.router.navigate(['home']);
  //       }
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       console.log("CHUCHLIKA");
  //     }
  //   });
  //   console.log(this.formData);
  // }

  loginUser = async (loginFormValue: any) => {
    loginFormValue.preventDefault();
    console.log(loginFormValue);
    const login = { ...loginFormValue };
    console.log(this.formData);
    const userForAuth: UserForAuthenticationDto = {
      username: this.formData.email,
      password: this.formData.password
    };
    
    this.loading = true;
  
    try {
      const res = await firstValueFrom(this.authService.loginUser('api/accounts/login', userForAuth));
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', userForAuth.username.toLowerCase());
      this.authService.sendAuthStateChangeNotification(true);
      this.router.navigate(["/home"]);
    } catch (err) {
      console.log(err);
      this.showErrorMessage = true;
    } finally {
      this.loading = false;
    }
  };


  onCreateAccountClick = () => {
    this.router.navigate(['auth', 'register']);
  }
}
