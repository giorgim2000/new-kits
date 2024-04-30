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
  formData: any ={};

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    this.loading = true;
    console.log(this.formData);
    const data = this.formData;
    console.log(data);
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
    return e.value === this.formData?.Password;
  }
}
