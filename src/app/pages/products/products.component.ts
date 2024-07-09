import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Make } from 'src/app/Dto\'s/make';
import { Model } from 'src/app/Dto\'s/model';
import { ModelByYear } from 'src/app/Dto\'s/modelByYear';
import { Product } from 'src/app/Dto\'s/product';
import { CartService } from 'src/app/services/cart.service';
import { ModelByYearService } from 'src/app/services/model-by-year.service';
import { ModelService } from 'src/app/services/model.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('900ms', style({ opacity: 1 })),
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
            animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
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
  toastType = "info";
  loadingText = 'Loading...';

  


  //  CART
  cartProdNumber:number = 0;

  //  POPUP
  notifyPopupVisible:boolean = false;


  constructor(private productService:ProductsService,private modelService:ModelService, private modelsByYearService:ModelByYearService, 
      private activatedRoute:ActivatedRoute, private cartService:CartService, private router:Router){}

  ngOnInit(): void {
    this.getModels();
    this.updateCart();
    
    const state = window.history.state;
    if (state.modelId && state.modelByYearId) {
      this.selectedModel = state.modelId;
      this.selectedmodelByYear = state.modelByYearId;
      this.modelsByYearSelectBoxDisabled = false;
      this.getModelsByYear(state.modelId);
      this.getProducts(undefined, this.selectedModel, this.selectedmodelByYear);
    }else
      this.getProducts();
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
      }
    })
  }

  updateCart(){
    this.cartProdNumber = this.cartService.getCartProductNumber();
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
    this.cartService.addToCart({id: product.id!, name:product.productName!, price:product.price!, quantity: product.quantityInCart && product.quantityInCart > 0 ? product.quantityInCart : 1});
    this.updateCart();
    this.displayProducts.find(i => i.id == product.id)!.quantityInCart = this.cartService.getProductQuantity(product.id!);
    this.showToast("პროდუქტი დამატებულია კალათში", 'success');
  }

  notifyMe(product:any){
    this.notifyPopupVisible = true;
  }

  productQuantityChange(e:any,product:any){

  }

  productsDetails(product:any){
    this.router.navigate([`products/${product.id}`], {state: {product: product}});
  }

  goToCart(){
    if(this.cartService.getCartProductNumber() > 0)
      this.router.navigate(['cart']);
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
    //this.toastType = type;
    this.toastVisible = true;
  }
}
