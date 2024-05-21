import { Injectable } from '@angular/core';
import { CartProduct } from '../Dto\'s/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'cart';

  constructor() { }

  getCart() {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  getCartProductNumber(){
    const cart = JSON.parse(localStorage.getItem(this.storageKey)!);
    if(cart != undefined)
      return cart.length;

    return 0;
  }

  addToCart(product:CartProduct) {
    const cart = this.getCart();
    var prod = cart.find((i:any) => i.id == product.id);
    if(prod == undefined)
      cart.push(product);
    else
      prod.quantity += 1;
    
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  getProductQuantity(id:number){
    const cart = this.getCart();
    var product = cart.find((i:CartProduct) => i.id == id);
    if(product == undefined)
      return 0;

    return product.quantity;
  }

  removeFromCart(productId:any) {
    let cart = this.getCart();
    cart = cart.filter((item : CartProduct) => item.id !== productId);
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  clearCart() {
    localStorage.removeItem(this.storageKey);
  }
}
