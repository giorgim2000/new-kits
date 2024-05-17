import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, input } from '@angular/core';
import { ImageDto } from 'src/app/Dto\'s/image';
import { ProductImageService } from 'src/app/services/product-image.service';

@Component({
  selector: 'app-product-image-grid',
  templateUrl: './product-image-grid.component.html',
  styleUrl: './product-image-grid.component.scss'
})
export class ProductImageGridComponent implements OnInit,OnDestroy {
  @Input()productId!:number;
  @Input()imagePopupVisible!:boolean;
  @Output() closePopup = new EventEmitter<void>();
  productImageDataSource:ImageDto[]=[];
  previewImageUrl:string|null = null;
  selectedFile: File | null = null;

  constructor(private productImageService:ProductImageService){}
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.productImageService.ngOnDestroy();
  }

  getImages(){
    this.productImageService.getProductImages(this.productId).subscribe({
      next:(res:any) => this.productImageDataSource = res,
      error:(err)=>console.log(err)
    });
  }

  saveImage(e:any){
    if(e.changes.length > 0 && e.changes[0].type == "insert" && this.selectedFile != null){
      let formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);
      this.productImageService.createProductImage(this.productId, formData).subscribe({
        next:(res) => {
          if(res){
            this.selectedFile = null;
            this.previewImageUrl = null;
          }
        },
        error:(err)=>console.log(err)
      });
    }
  }

  removeImage(e:any){
    this.productImageService.removeProductImage(e.key).subscribe({
      next:(res)=>console.log(res),
      error:(err)=>console.log(err)
    });
  }

  fileChanged(event: any) {
    this.selectedFile = event.value[0];
    const files: File[] = event.value;

    if (files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.previewImageUrl = e.target.result;
        };
        reader.readAsDataURL(files[0]);
    } else {
        this.previewImageUrl = null;
    }
  }

  popupShown(){
    this.getImages();
  }

  popupHidden(){
    this.imagePopupVisible = false;
    this.previewImageUrl = null;
    this.selectedFile = null;
    this.closePopup.emit();
  }
}
