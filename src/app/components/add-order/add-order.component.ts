import { Component, EventEmitter, Input, Output } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { City, CreateOrderDto } from 'src/app/Dto\'s/order';
import { Store } from 'src/app/Dto\'s/product';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.scss'
})
export class AddOrderComponent {
  @Input()addOrderPopupVisible!:boolean;
  @Output() closePopup = new EventEmitter<void>();
  order: CreateOrderDto = new CreateOrderDto();
  selectedProducts : any[] = [];
  stores: Store[] = [];
  cities: City[] = [];
  switchDisabled = false;
  switchVal : boolean = false;
  isCompany:boolean = false;
  firstName = "";
  lastName = "";
  userIdNumber = "";
  companyName = "";
  companyCode = "";
  phone = "";
  toAddress = "";
  selectedStore : Store | undefined;
  city : City = {};
  deliveryType = ['მიტანით', 'მიტანის გარეშე'];
  selectedDeliveryType = this.deliveryType[1];
  paymentTypes = [{id:0, name:'ქეში'}, {id:1, name:'გადარიცხვა'}, {id:2, name:'ბარათი'}];
  selectedPaymentType = 1;

  constructor(private orderService:OrderService){}

  getData(){

  }

  getProducts(){

  }

  confirmOrder(){
    this.addOrderPopupVisible = false;
    // this.order.User = this.order.User || {};
    // this.order.User.Registered = false;
    // this.order.User.Address = this.toAddress;
    // this.order.User.PhoneNumber = this.phone;
    // this.order.User.IsCompany = this.isCompany;
    // this.order.User.Resident = true;
    // if(this.isCompany){
    //   this.order.User.CompanyName = this.companyName;
    //   this.order.User.CompanyCode = this.companyCode;
    // }else{
    //   this.order.User.FirstName = this.firstName;
    //   this.order.User.LastName = this.lastName;
    //   this.order.User.UserIdNumber = this.userIdNumber;
    // }
    
    // this.order.StoreId = this.selectedStore!.id;
    // this.order.PaymentType = this.selectedPaymentType;
    // this.order.OrderProducts = this.selectedProducts.map(i => ({
    //   ProductId: i.id, FinaId: i.finaId, Quantity: i.quantity, Price:i.price,Discount:i.discount, CustomWarranty:i.customWarranty
    // }));

    // if(this.order.WithDelivery){
    //   this.order.Delivery = this.order.Delivery || {};
    //   this.order.Delivery!.from = this.selectedStore!.address;
    //   this.order.Delivery!.to = this.toAddress;
    //   this.order.Delivery!.cityId = this.city.id;
    //   this.order.Delivery.deliveryPrice = this.city.deliveryPrice;
    // }else
    //   this.order.Delivery = null;
    
    // this.orderService.postOrder(this.order).subscribe({
    //   next:(res) =>{
    //     if(res == false)
    //       notify("შეკვეთის გაკეთება ვერ მოხერხდა!", "default", 3000);
    //     else
    //       notify("შეკვეთა წარმატებით განხორციელდა, დაელოდეთ ინვოისს, რომელიც მოგივათ სმს-ის სახით ...", "success", 3000);
    //   },
    //   error:(err)=>{
    //     console.log(err);
    //     notify("შეკვეთის გაკეთება ვერ მოხერხდა!", "default");
    //   }
    // });
  }



  switchChange(e:any){
    this.isCompany = e.value;
  }

  cityDisplay(e:any){
    if(e)
      return `${e.name}  -  ${e.deliveryPrice}₾`;
    else
      return '';
  }

  deliveryValChange(e:any){
    this.order.WithDelivery = this.selectedDeliveryType == this.deliveryType[0];
  }

  paymentTypeChange(e:any){
    this.order.PaymentType = e.value;
  }

  popupShown(){
    this.getData();
  }

  popupHidden(){
    this.addOrderPopupVisible = false;
    this.closePopup.emit();
  }
}
