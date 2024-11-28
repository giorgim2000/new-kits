import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationCallbackData } from 'devextreme/common';
import notify from 'devextreme/ui/notify';
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

  checkUsername = (e: any) =>{

  }

  checkEmail = (e:any) =>{

  }

  checkPhoneNumber = (e:any)=>{

  }

  checkCompanyCode = (e:any)=>{

  }

  checkUserIdNumber = (e:any)=>{
    
  }

  switchChange(e:any){
    this.isCompany = e.value;
  }
}
