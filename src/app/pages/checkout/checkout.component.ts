import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { IUserClaim, User } from 'src/app/Dto\'s/User';
import { Order } from 'src/app/Dto\'s/order';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  userInfo : IUserClaim[] = [];
  order: Order = new Order();
  isCompany:boolean = false;
  buyerTypes = ['ფიზიკური პირი', 'იურიდიული პირი'];
  buyerType = this.buyerTypes[0];
  paymentTypes = [{id:1, name:'ქეში'}, {id:2, name:'გადარიცხვა'}, {id:3, name:'ბარათი'}];
  selectedPaymentType = 1;
  productsPopupVisible = false;
  selectedProducts : any[] = [];
  deliveryType = ['მიტანით', 'მიტანის გარეშე'];
  selectedDeliveryType = this.deliveryType[0];
  toastMessage:string = "შეკვეთა წარმატებით განხორციელდა!";
  toastVisible:boolean = false;
  toastType = "info";

  constructor(private authService:AuthService, private router:Router, private cartService:CartService){}

  ngOnInit(): void {
    this.setSelectedProducts();
    if(this.authService.isLoggedIn$)
      this.getUserInfo();
  }

  getUserInfo(){
    this.authService.getUserInfo().subscribe({
      next:(res : IUserClaim[])=>{
        this.userInfo = res;
        this.order.Firstname = this.userInfo[1].claimValue;
        this.order.Lastname = this.userInfo[2].claimValue;
        this.order.IdNumber = this.userInfo[3].claimValue;
        this.order.Phone = this.userInfo[4].claimValue;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  setSelectedProducts(){
    this.selectedProducts = this.cartService.getCart();
  }

  buyerTypeChange(e:any){
    if(e.value == this.buyerTypes[0])
      this.isCompany = false;
    else
      this.isCompany = true;
  }

  getProducts(){
    this.productsPopupVisible = true;
    console.log(this.order);
  }

  popupHidden(){
    this.productsPopupVisible = false;
  }

  deliveryValChange(e:any){

  }

  confirmOrder(){
    this.toastVisible = true;
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1500);
    
  }
}
