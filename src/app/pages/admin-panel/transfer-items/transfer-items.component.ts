import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StoresService } from 'src/app/services/stores.service';
import { TrItemsService } from 'src/app/services/tr-items.service';

@Component({
  selector: 'app-transfer-items',
  templateUrl: './transfer-items.component.html',
  styleUrl: './transfer-items.component.scss'
})
export class TransferItemsComponent implements OnInit, OnDestroy{
  @ViewChild('trItemsGrid') trGrid!: any;
  trItems :any[] = [];
  today = new Date();
  toDate : Date = new Date(new Date().setDate(this.today.getDate() + 1));
  fromDate : Date = new Date(new Date().setDate(this.toDate.getDate() - 30));
  completed? : boolean = true;
  notCompleted? : boolean = true;
  orderId?:number;
  storeId?:number;
  stores : any[] = [];
  dateRange:any[]=[];
  selectedRowKeys : number[] = [];

  toastMessage:string = "გადასატანი პროდუქციის სტატუსი შეცვლილია!";
  toastVisible:boolean = false;
  toastType = "success";


  constructor(private trService:TrItemsService, private storeService:StoresService){}

  ngOnInit(): void {
    this.getStores();
    this.getTrItems();
  }
  ngOnDestroy(): void {
    this.trService.ngOnDestroy();
  }

  getTrItems(){
    console.log(this.completed);
    this.trService.getItems({fromDate: this.fromDate, toDate: this.toDate, completed: this.completed, notCompleted: this.notCompleted, orderId: this.orderId, storeId: this.storeId})
                  .subscribe({next:(res:any) => this.trItems = res, error:(err) => console.log(err)});
    //   {
    //       id:1,
    //       crDate: new Date('2024-01-01'),
    //       dueDate: new Date('2024-01-15'),
    //       transferred: true,
    //       active: true,
    //       orderId: 1001,
    //       productId: 2001,
    //   },
    //   {
    //     id:16,
    //       crDate: new Date('2024-02-10'),
    //       dueDate: new Date('2024-02-25'),
    //       transferred: false,
    //       active: true,
    //       orderId: 1002,
    //       productId: 2002,
    //   },
    //   {
    //     id:51,
    //       crDate: new Date('2024-03-05'),
    //       dueDate: new Date('2024-03-20'),
    //       transferred: true,
    //       active: false,
    //       orderId: 1003,
    //       productId: 2003,
    //   },
    //   {
    //     id:99,
    //       crDate: new Date('2024-04-12'),
    //       dueDate: new Date('2024-04-27'),
    //       transferred: false,
    //       active: true,
    //       orderId: 1004,
    //       productId: 2004,
    //   },
    //   {
    //     id:11,
    //       crDate: new Date('2024-05-18'),
    //       dueDate: new Date('2024-06-02'),
    //       transferred: true,
    //       active: true,
    //       orderId: 1005,
    //       productId: 2005,
    //   }
    // ];
  }

  getStores(){
    this.storeService.getStores().subscribe({
      next:(res:any) => this.stores = res,
      error:(err)=>console.log(err)
    })
  }

  rowPrepared(e:any){
    if(e.rowType == "data"){
      if(e.data.transferred)
        e.rowElement.style.background = "rgb(92, 184, 92)";
      else
        e.rowElement.style.background = "rgb(233, 233, 32)";
    }
  }

  confirmStatus(){
    this.trService.updateTrItems({ids:this.selectedRowKeys, transferred: true}).subscribe({
      next: (res) => {
        this.getTrItems();
        this.trGrid.instance.clearSelection();
        this.trGrid.instance.reload();
        this.toastVisible = true;
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

  selectionChange(e:any){
    this.selectedRowKeys = e.selectedRowKeys;
  }

  refreshGrid(){
    this.getTrItems();
  }

  remove(e:any){
    console.log(e);
  }
}
