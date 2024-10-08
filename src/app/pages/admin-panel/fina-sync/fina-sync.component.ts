import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastType } from 'devextreme/ui/toast';
import { FinaSyncService } from 'src/app/services/fina-sync.service';

@Component({
  selector: 'app-fina-sync',
  templateUrl: './fina-sync.component.html',
  styleUrl: './fina-sync.component.scss'
})
export class FinaSyncComponent implements OnInit, OnDestroy {
  toastMessage = "";
  toastVisible = false;
  toastType : ToastType = "success";
  isLoading = false;

  constructor(private syncService: FinaSyncService){}

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    this.syncService.ngOnDestroy();
  }

  productSync(){
    this.isLoading = true;
    this.syncService.productSync().subscribe({
      next:(res) =>{
        this.isLoading = false;
        this.toastMessage = "სინქრონიზაცია წარმატებით განხორციელდა!";
        this.toastType = "success";
        this.toastVisible = true;
      },
      error:(err)=>{
        console.log(err);
        this.isLoading = false;
        this.toastMessage = `დაფიქსირდა შეცდომა - ${err}`;
        this.toastType = "error";
        this.toastVisible = true;
      }
    });
  }

  storeSync(){
    this.isLoading = true;
    this.syncService.storeSync().subscribe({
      next:(res) =>{
        this.isLoading = false;
        this.toastMessage = "სინქრონიზაცია წარმატებით განხორციელდა!";
        this.toastType = "success";
        this.toastVisible = true;
      },
      error:(err)=>{
        console.log(err);
        this.isLoading = false;
        this.toastMessage = `დაფიქსირდა შეცდომა - ${err}`;
        this.toastType = "error";
        this.toastVisible = true;
      }
    });
  }


}
