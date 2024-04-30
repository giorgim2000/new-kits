import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Model } from 'src/app/Dto\'s/model';
import { ModelService } from 'src/app/services/model.service';
import { ModelByYear } from 'src/app/Dto\'s/modelByYear';
import { ModelsByyearService } from 'src/app/services/models-byyear.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  imgPath:any[]=[];
  modelsDataSource: any[]=[];
  modelString = "";
  modelVisible = false;

  constructor(private _sanitizer: DomSanitizer, private _client: HttpClient, private modelService:ModelService, private modelByYearService:ModelsByyearService) { }

  ngOnDestroy(): void {
    this.modelService.ngOnDestroy();
    this.modelByYearService.ngOnDestroy();
  }

  ngOnInit(): void {
    this.getModels();
  }

  getModels(){
    this.modelService.getModels().subscribe({
      next: (res)=>{
        this.modelsDataSource = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getModelsByYear(id:number){
    this.modelByYearService.getModelsByYear(undefined, id).subscribe({
      next: (res)=>{
        this.modelsDataSource = res;
      },
      error: (err)=>{
        console.error(err);
      }
    })
  }

  modelClick(id:number, modelName:string){
    this.getModelsByYear(id);
    this.modelString = modelName;
    this.modelVisible = true;
  }

  modelByYearClick(id:number){

  }

  getImages(){
    this._client.get('https://localhost:7210/api/Test').subscribe({
          next: (res : any) => {
            this.transformImage(res.imageString);
          },
          error: (err) => {
            console.log(err);
          }
    })
    
  }

  transformImage(b64:any[]){
    b64.forEach(element => {
      this.imgPath.push(this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + element));
    });
  }
}

export interface ImageRes{
  ImageString:string;
}