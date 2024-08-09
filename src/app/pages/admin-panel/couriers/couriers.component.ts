import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('courierGrid') courierGrid!: any;

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

  createCourier(courier:CourierDto){
    this.courierService.postCourier(courier).subscribe({
      next:(res) => this.courierGrid.instance.refresh(),
      error:(err) => console.log(err)
    })
  }

  updateCourier(courier:CourierDto){
    this.courierService.putCourier(courier).subscribe({
      next:(res) => this.courierGrid.instance.refresh(),
      error:(err) => console.log(err)
    })
  }

  onChangesSaved(e: any) {
    this.courier = e.changes[0].data;
    if(e.changes.length > 0 && e.changes[0].type === 'insert'){
      const courierToCreate : CourierDto = e.changes[0].data;
      this.createCourier(courierToCreate);
    }
      //this.createCourier({FirstName:e.changes[0].data.firstname,LastName:e.changes[0].data.lastname,PhoneNumber:e.changes[0].data.phoneNumber,CourierIdNumber:e.changes[0].data.courierIdNumber});
    
    if(e.changes.length > 0 && e.changes[0].type === 'update'){
      if(e.changes[0].data != undefined){
        var courierToUpdate:CourierDto = e.changes[0].data;
        this.updateCourier(courierToUpdate);
      }
        //this.updateCourier({firstName:e.changes[0].data.firstname,lastName:e.changes[0].data.lastname,phoneNumber:e.changes[0].data.phoneNumber,courierIdNumber:e.changes[0].data.courierIdNumber});
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
