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

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    this.loading = true;
    const data = this.formData;
    const result = await this.authService.createAccount(data);
    this.loading = false;


    if (result.isOk) {
      notify("თქვენ წარმატებით გაიარეთ რეგისტრაცია!", 'success', 2000);
      this.router.navigate(['auth', '/login']);
    } else {
      notify(result.message, 'error', 2000);
    }
  }

  confirmPassword = (e: ValidationCallbackData) => {
    return e.value === this.formData!.Password;
  }

  switchChange(e:any){
    this.isCompany = e.value;
  }
}
