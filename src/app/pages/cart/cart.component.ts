import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ImageDto } from 'src/app/Dto\'s/image';
import { CartProduct } from 'src/app/Dto\'s/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductImageService } from 'src/app/services/product-image.service';
import { ScreenManagerService } from 'src/app/services/screen-manager.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cart : CartProduct[] = [];
  isLarge = false;

  constructor(private cartService: CartService, private productImageService:ProductImageService, private router:Router, private screen:ScreenManagerService) { }

  ngOnInit(): void {
    this.updateScreen();
    this.screen.changed.subscribe(() => this.updateScreen());
    this.loadCart();
  }

  loadCart() {
    this.cart = this.cartService.getCart();
    for (let index = 0; index < this.cart.length; index++) {
      this.productImageService.getProductImages(this.cart[index].id!).subscribe({
        next:(res:any)=>{
          if(res){
            this.cart[index].imageUrls = [];
            for (let i = 0; i < res.length; i++) {
              this.cart[index].imageUrls?.push(res[i].imageUrl);
            }
            console.log(this.cart);
          };
        },
        error:(err)=> console.log(err)
      })
    }
  }

  updateScreen(){
    this.isLarge = this.screen.sizes['screen-large'] || this.screen.sizes['screen-medium'] || this.screen.sizes['screen-small'];
  }

  getTotalPrice(){
    var sum = 0;
    if(this.cart.length > 0)
      this.cart.forEach(i => sum += i.discount != null && i.discount > 0 ? (i.price! * (1 - i.discount! / 100)) * i.quantity! : (i.price! * i.quantity!));

    return sum;
  }

  updateQuantity(product:any, e:any){
    product.quantity = e;
    this.cartService.addToCart(product);
  }

  removeProduct(productId:number) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  checkout(){
    this.router.navigate(['checkout']);
  }
}
