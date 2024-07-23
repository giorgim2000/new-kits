import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductRestWithStores } from 'src/app/Dto\'s/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductRestService } from 'src/app/services/product-rest.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy {
  product!:Product;
  cartProdNumber = 0;
  notifyPopupVisible = false;
  addProductDisabled = false;
  notifyMeBtnDisabled = false;
  restPopupVisible:boolean = false;
  productRestInfo: ProductRestWithStores[] = [];

  constructor(private router:Router, private cartService:CartService, private restService:ProductRestService){
    this.product = window.history.state.product;
  }

  ngOnInit(): void {
    console.log(this.product);
    this.cartProdNumber = this.cartService.getCartProductNumber();
    if(this.product.rest == 0 || this.product.rest == undefined)
      this.addProductDisabled = true;
    else
      this.notifyMeBtnDisabled = true;
  }
  
  ngOnDestroy(): void {
    
  }
  
  getProductRestInfo(){
    if(this.productRestInfo.length == 0){
      this.restService.getProductRestWithStores(this.product.finaId!).subscribe({
        next: (res)=> this.productRestInfo = res,
        error: (err)=> console.log(err)
      });
    }
  }

  goToCart(){
    this.router.navigate(['cart']);
  }

  addToCart(){
    this.cartService.addToCart({id:this.product.id!, name:this.product.productName!, price:this.product.price!, quantity: this.product.quantityInCart && this.product.quantityInCart > 0 ? this.product.quantityInCart : 1})
    this.updateCart();
  }

  updateCart(){
    this.cartProdNumber = this.cartService.getCartProductNumber();
  }


  goBack(){
    this.router.navigate(['/products']);
  }

  showRestPopup(rest:number){
    if(rest > 0){
      this.getProductRestInfo();
      this.restPopupVisible = true;
    }
  }

  closeRestPopup(){
    this.restPopupVisible = false;
  }

  notifyMe(){
    this.notifyPopupVisible = true;
  }

  notifyConfirmation(){

  }

  closePopup(){
    this.notifyPopupVisible = false;
  }
}
