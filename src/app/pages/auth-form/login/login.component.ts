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
  errorMessage = "მომხმარებელი ან პაროლი არასწორია!";

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
    const login = { ...loginFormValue };
    console.log(login);
    const userForAuth: UserForAuthenticationDto = {
      username: this.formData.email,
      password: this.formData.password
    };
    
    this.loading = true;
    this.authService.loginUser('api/accounts/login', userForAuth).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.isAuthSuccessful){
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', userForAuth.username.toLowerCase());
          this.authService.sendAuthStateChangeNotification(true);
          this.router.navigate(["/home"]);
        }else{
          this.errorMessage = "მომხმარებელი ან პაროლი არასწორია!";
          this.showErrorMessage = true;
        }
        this.loading = false;
      },
      error:(err)=>{
        console.log(err);
        this.errorMessage = "დაფიქსირდა შეცდომა! შეამოწმეთ ინტერნეტთან წვდომა!";
        this.showErrorMessage = true;
        this.loading = false;
      }
    })
  
    //try {
      //const res = await firstValueFrom(this.authService.loginUser('api/accounts/login', userForAuth));
      //localStorage.setItem('token', res.token);
      //localStorage.setItem('username', userForAuth.username.toLowerCase());
      //this.authService.sendAuthStateChangeNotification(true);
      //this.router.navigate(["/home"]);
    // } catch (err) {
    //   console.log(err);
    //   this.errorMessage = "მომხმარებელი ან პაროლი არასწორია!";
    //   this.showErrorMessage = true;
    // } finally {
    //   this.loading = false;
    // }
  };


  onCreateAccountClick = () => {
    this.router.navigate(['auth', 'register']);
  }
}
