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

  constructor(private router:Router, private cartService:CartService){
    this.product = window.history.state.product;
  }

  ngOnInit(): void {
    this.cartProdNumber = this.cartService.getCartProductNumber();
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

  notifyMe(){
    this.notifyPopupVisible = true;
  }

  notifyConfirmation(){

  }

  closePopup(){
    this.notifyPopupVisible = false;
  }
}
