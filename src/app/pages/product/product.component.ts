import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Dto\'s/product';
import { CartService } from 'src/app/services/cart.service';

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
  isHovered:boolean = false;
  restPopupVisible:boolean = false;

  constructor(private router:Router, private cartService:CartService){
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

  showRestPopup(){
    this.restPopupVisible = true;
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
