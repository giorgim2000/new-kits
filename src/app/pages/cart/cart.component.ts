import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  loading = false;

  constructor(private cartService: CartService, private productImageService:ProductImageService, private router:Router) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.loading = true;
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
          this.loading = false;
        },
        error:(err)=> this.loading = false
      })
    }
  }

  getTotalPrice(){
    var sum = 0;
    if(this.cart.length > 0)
      this.cart.forEach(i => sum += (i.price * i.quantity));

    return sum;
  }

  updateQuantity(product:any, e:any){
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
