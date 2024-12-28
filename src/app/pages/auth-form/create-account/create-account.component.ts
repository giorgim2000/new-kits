import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationCallbackData } from 'devextreme/common';
import notify from 'devextreme/ui/notify';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


export const sendRequest = function (obs: Observable<boolean>) {
  return new Promise(async(resolve) => {
    var val = await firstValueFrom(obs);
    setTimeout(() => {
      resolve(val);
    }, 1000);
  });
};

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
  loading = false;
  formData: any = {};
  isCompany = false;
  showErrorMessage = false;
  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    this.loading = true;

    // Ensure that formData is correctly configured
    const result = await this.authService.createAccount(this.formData);

    this.loading = false;

    if (result.isOk) {
      notify("თქვენ წარმატებით გაიარეთ რეგისტრაცია!", 'success', 2000);
      setTimeout(() => {
        this.router.navigate(['auth', 'signin']);
      }, 1800);
    } else {
      this.showErrorMessage = true;
      notify("დაფიქსირდა შეცდომა!", 'error', 2000);
    }
  }

  confirmPassword = (e: ValidationCallbackData) => {
    return new Promise((resolve) =>{
      resolve(e.value === this.formData!.Password);
    })
  }

  checkUsername = (params: ValidationCallbackData) => sendRequest(this.authService.checkAvailability(params.value, null, null, null, null));

  checkEmail = (params: ValidationCallbackData) => sendRequest(this.authService.checkAvailability(null, null, null, null, params.value));

  checkPhoneNumber = (params: ValidationCallbackData) => sendRequest(this.authService.checkAvailability(null, null, null, params.value, null));

  checkCompanyCode = (params: ValidationCallbackData) => sendRequest(this.authService.checkAvailability(null, null, params.value, null, null));

  checkUserIdNumber = (params: ValidationCallbackData) => sendRequest(this.authService.checkAvailability(null, params.value, null, null, null));

  switchChange(e:any){
    this.isCompany = e.value;
  }
}
