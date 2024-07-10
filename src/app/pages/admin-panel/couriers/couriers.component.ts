import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourierDto } from 'src/app/Dto\'s/courier';
import { CourierService } from 'src/app/services/courier.service';

@Component({
  selector: 'app-couriers',
  templateUrl: './couriers.component.html',
  styleUrl: './couriers.component.scss'
})
export class CouriersComponent implements OnInit, OnDestroy {
  couriers:CourierDto[] = [];
  courier:CourierDto | undefined;

  constructor(private courierService:CourierService){}

  ngOnInit(): void {
    this.getCouriers();
  }
  ngOnDestroy(): void {
    this.courierService.ngOnDestroy();
  }

  getCouriers(){
    this.courierService.getCouriers().subscribe({
      next:(res) => this.couriers = res,
      error:(err)=>console.log(err)
    })
  }

  onChangesSaved(e: any) {
    if(e.changes.length > 0 && e.changes[0].type === 'insert'){
      //create
    }
    
    if(e.changes.length > 0 && e.changes[0].type === 'update'){
      if(e.changes[0].data != undefined){
        // this.makeName = e.changes[0].data.makeName;
        // this.editingActive = e.changes[0].data.active;
      }
      //update
    }
  }

  onEditorPrep(e:any){
    // if(!e.row.isNewRow && e.row.isEditing){
    //   this.courier = {id: e.row.data.id, firstname: e.row.data.firstname, lastname: e.row.data.lastname, phoneNumber: e.row.data.phoneNumber, courierIdNumber: e.row.data.courierIdNumber};
    // }
  }

  removeCourier(e:any){
    
  }
}
