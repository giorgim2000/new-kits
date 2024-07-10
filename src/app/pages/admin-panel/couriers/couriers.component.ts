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
}
