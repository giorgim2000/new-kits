import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CreateCityDto, UpdateCityDto } from 'src/app/Dto\'s/order';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss'
})
export class CitiesComponent implements OnInit, OnDestroy {
  cities = [];
  @ViewChild('citiesGrid') cityGrid!: any;

  constructor(private cityService:CityService){}

  ngOnInit(): void {
    this.getCities();
  }
  ngOnDestroy(): void {
    this.cityService.ngOnDestroy();
  }


  getCities(){
    this.cityService.get().subscribe({
      next:(res) => this.cities = res,
      error:(err)=>console.log(err)
    });
  }

  createCity(city:CreateCityDto){
    this.cityService.postCity(city).subscribe({
      next:(res) => this.cityGrid.instance.refresh(),
      error:(err)=>console.log(err)
    });
  }

  updateCity(city:UpdateCityDto){
    this.cityService.putCity(city).subscribe({
      next:(res) => this.cityGrid.instance.refresh(),
      error:(err)=>console.log(err)
    });
  }

  onChangesSaved(e:any){
    if(e.changes.length > 0 && e.changes[0].type === 'insert')
      this.createCity({name: e.changes[0].data.name, deliveryPrice:e.changes[0].data.deliveryPrice});

    if(e.changes.length > 0 && e.changes[0].type === 'update' && e.changes[0].data != undefined)
      this.updateCity({id:e.changes[0].data.id, name: e.changes[0].data.name, deliveryPrice:e.changes[0].data.deliveryPrice});
  }

  removeItem(event:any){
    this.cityService.removeCity(event.key).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
