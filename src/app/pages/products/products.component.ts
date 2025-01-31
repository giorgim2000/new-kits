import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Make } from 'src/app/Dto\'s/make';
import { Model } from 'src/app/Dto\'s/model';
import { ModelByYear } from 'src/app/Dto\'s/modelByYear';
import { Product } from 'src/app/Dto\'s/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ModelByYearService } from 'src/app/services/model-by-year.service';
import { ModelService } from 'src/app/services/model.service';
import { ProductImageService } from 'src/app/services/product-image.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('700ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('fadeInList', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-15px)' }),
          stagger('100ms', [
            animate('500ms', style({ opacity: 1, transform: 'translateY(0)' }))
          ]),
        ], { optional: true })
      ])
    ]),
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
export class ProductsComponent implements OnInit {
  searchWord:string ="";
  // selectedMake:number | undefined;
  // makes:Make[]=[];
  selectedModel:number | undefined;
  models:Model[]=[];
  selectedmodelByYear:number | undefined;
  modelsByYear:ModelByYear[]=[];
  modelsByYearSelectBoxDisabled : boolean = true;
  products:any[]=[];
  displayProducts:Product[]=[];
  isLoading=false;
  toastMessage:string = "";
  toastVisible:boolean = false;
  toastType : any = "info";
  loadingText = 'Loading...';
  isAdmin = false;
  cartBtnsDisabled = false;
  
  showCart = false;
  get cartState(){
    return this.showCart ? 'visible' : 'hidden';
  }
  showContext = false;
  get contextState() {
    return this.showContext ? 'visible' : 'hidden';
  }


  //  CART
  cartProdNumber:number = 0;
  cartTotalPrice = 0;
  @ViewChild('cartContextDiv') cartContextDiv!: ElementRef;
  @ViewChild('cartIcon') cartIcon!: any;

  //  POPUP
  notifyPopupVisible:boolean = false;


  constructor(private productService:ProductsService,private modelService:ModelService, private modelsByYearService:ModelByYearService, 
      private authService:AuthService, private cartService:CartService, private router:Router, private productImageService:ProductImageService){}

  ngOnInit(): void {
    this.getModels();
    this.updateCart();
    this.authService.isAdmin().subscribe({
      next:(res)=>this.isAdmin = res,
      error:(err)=> this.isAdmin = false
    });
    
    const state = window.history.state;

    if (state.modelId && state.modelByYearId) {
      this.selectedModel = state.modelId;
      this.selectedmodelByYear = state.modelByYearId;
      this.modelsByYearSelectBoxDisabled = false;
      this.getModelsByYear(state.modelId);
      this.getProducts(undefined, this.selectedModel, this.selectedmodelByYear);
    }else
      this.getProducts();

    this.products = this.cartService.getCart();
  }

  getModels(){
    this.modelService.getModels().subscribe({
      next:(res)=>{
        this.models = res;
      }
    })
  }

  getModelsByYear(modelId:number){
    this.modelsByYearService.getModelsByYear(undefined, modelId).subscribe({
      next:(res)=>{
        this.modelsByYear = res;
      }
    })
  }

  getProducts(searchWord?:string, modelId?:number,modelByYearId?:number){
    this.isLoading = true;
    this.productService.getProducts(false, searchWord, modelId, modelByYearId).subscribe({
      next:(res)=>{
        this.displayProducts = res;
        this.displayProducts.forEach((i : Product) => {
          i.quantityInCart = this.cartService.getProductQuantity(i.id!);
        });
        this.isLoading = false;
      },
      error:(err)=>{
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  onCartClick(){
    this.cartBtnsDisabled = this.products.length <= 0;
    this.showContext = !this.showContext; 
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedInsideContext = this.cartContextDiv?.nativeElement?.contains(event.target);
    const clickedOnIcon = this.cartIcon?.element.nativeElement?.contains(event.target);
  
    if (!clickedInsideContext && !clickedOnIcon) {
      this.showContext = false;
    }
  }

  updateCart(){
    this.cartProdNumber = this.cartService.getCartProductNumber();
    this.cartTotalPrice = this.cartService.getTotalPrice();
    this.loadCart();
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

  modelValueChanged(e:any){
    if(e.value != null){
      this.modelsByYearSelectBoxDisabled = false;
      this.getModelsByYear(e.value);
    }else{
      this.selectedmodelByYear = undefined;
      this.modelsByYearSelectBoxDisabled = true;
    }
    
  }

  modelsByYearValueChange(e:any){
    
  }

  search(){
    this.getProducts(this.searchWord, this.selectedModel, this.selectedmodelByYear);
  }

  addToCart(product:Product){
    this.cartService.addToCart({id: product.id!, finaId:product.finaId, name:product.productName!, price:product.price!, 
                                discount:product.discount, customWarranty: product.warranty, 
                                quantity: product.quantityInCart && product.quantityInCart > 0 ? product.quantityInCart : this.cartService.getProductQuantity(product.id!) == 0 ? 1 : 0});
    this.updateCart();
    var inCartQuantity = this.cartService.getProductQuantity(product.id!);
    if(inCartQuantity != 0){
      this.displayProducts.find(i => i.id == product.id)!.quantityInCart = inCartQuantity;
      this.showToast("პროდუქტი დამატებულია კალათში", 'success');
    }else{
      this.showToast("პროდუქტი ამოღებულია კალათიდან", 'info');
    }
  }

  removeProduct(item:any){
    this.cartService.removeFromCart(item);
    this.updateCart();
  }

  notifyMe(product:any){
    this.notifyPopupVisible = true;
  }

  productQuantityChange(e:any,product:Product){
    product.quantityInCart = e.value;
  }

  productsDetails(product:any){
    this.router.navigate([`products/${product.id}`], {state: {product: product}});
  }

  goToCart(){
    // if(this.cartService.getCartProductNumber() > 0)
    //   this.router.navigate(['cart']);
    this.showCart = true;
  }

  hideCart(){
    console.log("shemovida");
    this.showCart = false;
  }

  goToCheckout(){
    if(this.cartService.getCartProductNumber() > 0)
      this.router.navigate(['checkout']);
  }

  setupGalleryClickHandler(event:any) {
    const galleryElement = event.element;

    // Add event listeners to gallery nav buttons to stop propagation
    const navButtons = galleryElement.querySelectorAll('.dx-gallery-nav-button');
    navButtons.forEach((button:any) => {
      button.addEventListener('click', (e:any) => {
        e.stopPropagation();
      });
    });
  }


  notifyConfirmation(){

  }

  closePopup(){
    this.notifyPopupVisible = false;
  }

  showToast(msg: string, type: string) {
    this.toastMessage = msg;
    this.toastType = type;
    this.toastVisible = true;
  }
}
