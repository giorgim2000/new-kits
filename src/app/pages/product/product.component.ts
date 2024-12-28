import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { Product, ProductRestWithStores } from 'src/app/Dto\'s/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductImageService } from 'src/app/services/product-image.service';
import { ProductRestService } from 'src/app/services/product-rest.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
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
    ]),
    trigger('cartMaximize', [
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
export class ProductComponent implements OnInit, OnDestroy {
  product!:Product;
  cartProdNumber = 0;
  notifyPopupVisible = false;
  addProductDisabled = false;
  notifyMeBtnDisabled = false;
  restPopupVisible:boolean = false;
  productRestInfo: ProductRestWithStores[] = [];
  showCart = true;
  products : any[] = [];
  cartTotalPrice = 0;
  showContext = false;
  get contextState() {
    return this.showContext ? 'visible' : 'hidden';
  }
  get cartState(){
    return this.showCart ? 'visible' : 'hidden';
  }
  @ViewChild('cartContextDiv') cartContextDiv!: ElementRef;
  @ViewChild('cartIcon') cartIcon!: any;

  constructor(private router:Router, private cartService:CartService, private restService:ProductRestService,private productImageService:ProductImageService){
    this.product = window.history.state.product;
  }

  ngOnInit(): void {
    this.products = this.cartService.getCart();
    this.cartProdNumber = this.cartService.getCartProductNumber();
    this.updateCart();
    if(this.product.rest == 0 || this.product.rest == undefined)
      this.addProductDisabled = true;
    else
      this.notifyMeBtnDisabled = true;
  }
  
  ngOnDestroy(): void {
    this.restService.ngOnDestroy();
    this.productImageService.ngOnDestroy();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedInsideContext = this.cartContextDiv?.nativeElement?.contains(event.target);
    const clickedOnIcon = this.cartIcon?.element.nativeElement?.contains(event.target);
  
    if (!clickedInsideContext && !clickedOnIcon) {
      this.showContext = false;
    }
  }
  
  getProductRestInfo(){
    if(this.productRestInfo.length == 0){
      this.restService.getProductRestWithStores(this.product.finaId!).subscribe({
        next: (res)=> this.productRestInfo = res,
        error: (err)=> console.log(err)
      });
    }
  }

  hideCart(){
    this.showCart = false;
  }

  removeProduct(item:any){
    this.cartService.removeFromCart(item);
    this.updateCart();
  }

  goToCart(){
    this.showCart = true;
    //this.router.navigate(['cart']);
  }

  goToCheckout(){
    this.router.navigate(['checkout']);
  }

  onCartClick(){
    if(this.products.length > 0)
      this.showContext = !this.showContext; 
  }

  loadCart() {
    this.products = this.cartService.getCart();
    for (let index = 0; index < this.products.length; index++) {
      this.productImageService.getProductImages(this.products[index].id!).subscribe({
        next:(res:any)=>{
          if(res){
            this.products[index].imageUrls = [];
            for (let i = 0; i < res.length; i++) {
              this.products[index].imageUrls?.push(res[i].imageUrl);
            }
          };
        },
        error:(err)=> console.log(err)
      })
    }
  }

  updateCart(){
    this.cartProdNumber = this.cartService.getCartProductNumber();
    this.cartTotalPrice = this.cartService.getTotalPrice();
    this.loadCart();
  }

  addToCart(){
    this.cartService.addToCart({id:this.product.id!, finaId:this.product.finaId, name:this.product.productName!, discount:this.product.discount,customWarranty:this.product.warranty, price:this.product.price!, quantity: this.product.quantityInCart && this.product.quantityInCart > 0 ? this.product.quantityInCart : 1})
    this.updateCart();
    notify("პროდუქტი დამატებულია კალათში", 'success');
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
