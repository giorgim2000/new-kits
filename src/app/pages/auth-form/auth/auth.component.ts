import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthResponseDto, UserForAuthenticationDto } from 'src/app/Dto\'s/User';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  private returnUrl!: string;
  
  loginForm!: FormGroup;
  //errorMessage: string = '';
  //showError!: boolean;
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
  
  loginUser = (loginFormValue:any) => {
    //this.showError = false;
    const login = {... loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      username: login.username,
      password: login.password
    }
    this.authService.loginUser('api/accounts/login', userForAuth)
    .subscribe({
      next: (res:AuthResponseDto) => {
       console.log(res);
       localStorage.setItem("token", res.token);
       localStorage.setItem("username", userForAuth.username);
       this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
       this.router.navigate([this.returnUrl]);
    },
    error: (err: HttpErrorResponse) => {
      console.log(err);
      this.toastVisible = true;
      //this.errorMessage = err.message;
      //this.showError = true;
    }})
  }
}
