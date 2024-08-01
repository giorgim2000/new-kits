import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthResponseDto, UserForAuthenticationDto } from 'src/app/Dto\'s/User';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  private returnUrl!: string;
  loading = false;
  loginForm!: FormGroup;
  toastMessage:string = "მომხმარებელი ან პაროლი არასწორია!";
  toastVisible:boolean = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  validateControl = (controlName: string) => {
    return this.loginForm.get(controlName)!.invalid && this.loginForm.get(controlName)!.touched
  }
  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName)!.hasError(errorName)
  }
  
  // loginUser = (loginFormValue:any) => {
  //   const login = {... loginFormValue };
  //   const userForAuth: UserForAuthenticationDto = {
  //     username: login.username,
  //     password: login.password
  //   }
  //   this.loading = true;
  //   this.authService.loginUser('api/accounts/login', userForAuth)
  //   .subscribe({
  //     next: (res:AuthResponseDto) => {
       
  //      localStorage.setItem("token", res.token);
  //      localStorage.setItem("username", userForAuth.username);
  //      this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
  //      this.router.navigate([this.returnUrl]);
  //   },
  //   error: (err: HttpErrorResponse) => {
  //     console.log(err);
  //     this.toastVisible = true;
  //   }})
  // }

  loginUser = async (loginFormValue: any) => {
    const login = { ...loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      username: login.username,
      password: login.password,
    };
    
    this.loading = true;
  
    try {
      const res = await firstValueFrom(this.authService.loginUser('api/accounts/login', userForAuth));
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', userForAuth.username);
      await this.authService.sendAuthStateChangeNotification(true);
      this.router.navigate([this.returnUrl]);
    } catch (err) {
      console.log(err);
      this.toastVisible = true;
    } finally {
      this.loading = false;
    }
  };
}
