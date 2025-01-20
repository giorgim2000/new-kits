import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Model } from 'src/app/Dto\'s/model';
import { ModelByYear } from 'src/app/Dto\'s/modelByYear';
import { ModelByYearService } from 'src/app/services/model-by-year.service';
import { ModelService } from 'src/app/services/model.service';
import { ShowroomService } from 'src/app/services/showroom.service';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrl: './showroom.component.scss',
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
export class ShowroomComponent implements OnInit, OnDestroy {
  modelClicked = false;
  models : Model[] = [];
  modelsByYear : ModelByYear[] = [];
  loading = false;
  // public get loading(){
  //   return this._loading;
  // }

  // public set loading(value:boolean){
  //   if(value)
  //     document.getElementById('loading-spinner').style.display = 'flex';
  // }

  constructor(private modelService:ModelService, private modelByYearService:ModelByYearService, private showroomService:ShowroomService){}

  ngOnInit(): void {
    this.getModels();
  }

  ngOnDestroy(): void {
    this.modelService.ngOnDestroy();
    this.modelByYearService.ngOnDestroy();
    
  }


  getModels(){
    this.modelService.getModels().subscribe({
      next:(res) => this.models = res,
      error:(err)=> console.log(err)
    })
  }

  onModelClick(e:any){
    this.modelByYearService.getModelsByYear(undefined, e.id).subscribe({
      next:(res) => {
        this.modelsByYear = res;
        this.modelClicked = true;
      },
      error:(err) => console.log(err)
    })
  }

  onModelByYearClick(e:any){

  }

  scrollLeft() {
    const container = document.querySelector('.media-scroller')!;
    container.scrollLeft -= 900;
  }

  scrollRight() {
    const container = document.querySelector('.media-scroller')!;
    container.scrollLeft += 900;
  }

  scrollUp(){
    const container = document.querySelector('.modelsByYear')!;
    container.scrollTop -= 900;
  }

  scrollDown(){
    const container = document.querySelector('.modelsByYear')!;
    container.scrollTop += 900;
  }



  // testVal = "";
  // confirmVal = "";
  // cancelVal = "";
  // testVisible = false;

  confirmation(){
    this.loading = true;
  }

  // testClose(e:any){
  //   this.testVisible = false;
  //   console.log(e);
  //   alert(e);
  // }
}
