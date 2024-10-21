import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  standalone:true,
  imports:[DxButtonModule, CommonModule, BrowserAnimationsModule],
  styleUrl: './cart-icon.component.scss',
  animations:[
    trigger('maximize', [
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0)',
        transformOrigin: 'top right' // Change to control origin point
      })),
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)',
        transformOrigin: 'top right'
      })),
      transition('hidden => visible', animate('300ms ease-out')),
      transition('visible => hidden', animate('300ms ease-in'))
    ])
  ]
})
export class CartIconComponent {
  cartProdNumber:number = 0;
  contextState :boolean = false;
  products:any[]=[];
  cartTotalPrice:number = 0;

  constructor(private cartService:CartService, private router:Router){}

  onCartClick(){
    this.contextState = !this.contextState;
  }

  removeProduct(e:number){

  }

  goToCart(){
    if(this.cartService.getCartProductNumber() > 0)
      this.router.navigate(['cart']);
  }

  goToCheckout(){
    if(this.cartService.getCartProductNumber() > 0)
      this.router.navigate(['checkout']);
  }
}
