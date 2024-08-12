import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, timeout } from 'rxjs';
import { IUserClaim, User } from 'src/app/Dto\'s/User';
import { City, CreateOrderDto, Order } from 'src/app/Dto\'s/order';
import { Store } from 'src/app/Dto\'s/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CityService } from 'src/app/services/city.service';
import { StoresService } from 'src/app/services/stores.service';
import { deliveryPrice } from 'src/assets/config';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  userInfo : IUserClaim[] = [];
  stores: Store[] = [];
  cities: City[] = [];
  order: CreateOrderDto = new CreateOrderDto();
  isCompany:boolean = false;
  buyerTypes = ['ფიზიკური პირი', 'იურიდიული პირი'];
  buyerType = this.buyerTypes[0];
  paymentTypes = [{id:0, name:'ქეში'}, {id:1, name:'გადარიცხვა'}, {id:2, name:'ბარათი'}];
  selectedPaymentType = 1;
  productsPopupVisible = false;
  selectedProducts : any[] = [];
  deliveryType = ['მიტანით', 'მიტანის გარეშე'];
  selectedDeliveryType = this.deliveryType[1];
  toastMessage:string = "შეკვეთა წარმატებით განხორციელდა!";
  toastVisible:boolean = false;
  toastType = "info";
  deliveryPrices = deliveryPrice;
  selectedStore : Store | undefined;
  firstName = "";
  lastName = "";
  userIdNumber = "";
  companyName = "";
  companyCode = "";
  phone = "";
  toAddress = "";
  cityId = 1;
  switchDisabled = false;
  switchVal : boolean = false;
  boxWidth = '31%';



  constructor(public authService:AuthService, private router:Router, private cartService:CartService,private cityService:CityService,private storeService:StoresService){}

  ngOnInit():void {
    if(this.authService.loggedIn){
      this.getUserInfo();
      this.switchDisabled = true;
    }

    this.setSelectedProducts();
    this.getStores();
    this.getCities();
  }

  getUserInfo(){
    this.authService.getUserInfo().toPromise().then((res:any) =>{
      if(res.length > 0){
        this.order.User = this.order.User || {};
        this.userInfo = res;
        this.order.User!.Registered = true;
        this.isCompany = this.userInfo.find(i => i.claimType == "IsCompany")?.claimValue == "True";
        this.switchVal = this.isCompany;
        this.order.User!.Id = Number(this.userInfo.find(i => i.claimType.endsWith("nameidentifier"))?.claimValue);
        this.order.User!.FinaId = Number(this.userInfo.find(i => i.claimType == "FinaId")?.claimValue);
        this.phone = this.userInfo.find(i => i.claimType.endsWith("mobilephone"))!.claimValue;
        if(this.userInfo.find(i => i.claimType == "IsCompany")?.claimValue == "True"){
          this.companyName = this.userInfo.find(i => i.claimType == "CompanyName")!.claimValue;
          this.companyCode = this.userInfo.find(i => i.claimType == "CompanyCode")!.claimValue;
        }else{
          this.firstName = this.userInfo.find(i => i.claimType == "Firstname")!.claimValue;
          this.lastName = this.userInfo.find(i => i.claimType == "Lastname")!.claimValue;
          this.userIdNumber = this.userInfo[3].claimValue;
        }
        this.setBoxWidth();
        if(Number(this.userInfo.find(i => i.claimType == "consigDays")?.claimValue) > 0)
          this.paymentTypes.push({id:3,name:"კონსიგნაცია"});
      }
    })
  }

  getStores(){
    this.storeService.getStores().subscribe({
      next:(res:any) => 
        {
          this.stores = res;
          this.selectedStore = this.stores[0];
        },
      error:(err)=>console.log(err)
    })
  }

  getCities(){
    this.cityService.get().subscribe({
      next:(res) => this.cities = res,
      error:(err) => console.log(err)
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
  }

  popupHidden(){
    this.productsPopupVisible = false;
  }

  deliveryValChange(e:any){
    this.order.WithDelivery = this.selectedDeliveryType == this.deliveryType[0];
  }

  paymentTypeChange(e:any){
    this.order.PaymentType = e.value;
  }

  cityDisplay(e:any){
    if(e)
      return `${e.name}  -  ${e.deliveryPrice}₾`;
    else
      return '';
  }

  switchChange(e:any){
    this.isCompany = e.value;
    this.setBoxWidth();
  }

  setBoxWidth(){
    if(this.isCompany)
      this.boxWidth = '48%';
    else
      this.boxWidth = '31%';
  }

  confirmOrder(){
    this.order.StoreId = this.selectedStore!.id;
    this.order.PaymentType = this.selectedPaymentType;
    if(this.order.WithDelivery)
      this.order.Delivery!.from = this.selectedStore!.address

    this.toastVisible = true;
    console.log(this.order);
    // this.cartService.clearCart();
    // setTimeout(() => {
    //   this.router.navigate(['/home']);
    // }, 1500);
    
  }
}
