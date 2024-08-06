import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Model } from 'src/app/Dto\'s/model';
import { ModelService } from 'src/app/services/model.service';
import { ModelByYear } from 'src/app/Dto\'s/modelByYear';
import { ModelByYearService } from 'src/app/services/model-by-year.service';
import { Router } from '@angular/router';

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
  selectedModelId:number|undefined;

  constructor(private router:Router, private modelService:ModelService, private modelByYearService:ModelByYearService) { }

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
        this.modelsDataSource = res.sort((a:any, b:any) => {
          if (a.lineNum == null && b.lineNum == null) {
              return 0;
          }
          if (a.lineNum == null) {
              return 1;
          }
          if (b.lineNum == null) {
              return -1;
          }
          return a.lineNum - b.lineNum;
      });
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getModelsByYear(id:number){
    this.modelByYearService.getModelsByYear(undefined, id).subscribe({
      next: (res)=>{
        this.modelsDataSource = res.sort((a:any, b:any) => {
          if (a.lineNum == null && b.lineNum == null) {
              return 0;
          }
          if (a.lineNum == null) {
              return 1;
          }
          if (b.lineNum == null) {
              return -1;
          }
          return a.lineNum - b.lineNum;
      });
      },
      error: (err)=>{
        console.error(err);
      }
    })
  }

  displayModels(){
    this.getModels();
    this.modelVisible = false;
    this.selectedModelId = undefined;
  }

  modelClick(id:number, modelName:string){
    this.selectedModelId = id;
    this.getModelsByYear(id);
    this.modelString = modelName;
    this.modelVisible = true;
  }

  modelByYearClick(id:number){
    this.router.navigate(['products'], {state: {modelId: this.selectedModelId, modelByYearId: id}})
  }
}