import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationCallbackData } from 'devextreme/common';
import notify from 'devextreme/ui/notify';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

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
    return e.value === this.formData!.Password;
  }

   checkUsername = async (e: any)=>{
    // var res = await firstValueFrom(this.authService.checkAvailability(e.value, null, null, null, null));
    // return res;
    console.log(e);
    this.loading = true;
    var result = await this.authService.checkAvailability(e.value, null, null, null, null).subscribe((res) => {
      this.loading = false;
      return res;
    });

    return result;
  }

  checkEmail = (e:any) =>{
    return true;
  }

  checkPhoneNumber = (e:any)=>{
    return false;
  }

  checkCompanyCode = (e:any)=>{

  }

  checkUserIdNumber = (e:any)=>{
    
  }

  switchChange(e:any){
    this.isCompany = e.value;
  }
}
