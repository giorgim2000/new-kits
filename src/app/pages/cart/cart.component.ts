import { Component } from '@angular/core';
import { ImageDto } from 'src/app/Dto\'s/image';
import { CartProduct } from 'src/app/Dto\'s/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductImageService } from 'src/app/services/product-image.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cart : CartProduct[] = [];

  constructor(private cartService: CartService, private productImageService:ProductImageService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cart = this.cartService.getCart();
    for (let index = 0; index < this.cart.length; index++) {
      this.productImageService.getProductImages(this.cart[index].id).subscribe({
        next:(res:any)=>{
          console.log(res);
          if(res){
            this.cart[index].imageUrls = [];
            for (let i = 0; i < res.length; i++) {
              this.cart[index].imageUrls?.push(res[i].imageUrl);
            }
            console.log(this.cart);
          };
        }
      })
    }
  }

  removeProduct(productId:number) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }
}
