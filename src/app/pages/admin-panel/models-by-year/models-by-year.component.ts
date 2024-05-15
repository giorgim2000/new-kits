import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Model } from 'src/app/Dto\'s/model';
import { ModelByYear } from 'src/app/Dto\'s/modelByYear';
import { MakeService } from 'src/app/services/make.service';
import { ModelByYearService } from 'src/app/services/model-by-year.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-models-by-year',
  templateUrl: './models-by-year.component.html',
  styleUrl: './models-by-year.component.scss'
})
export class ModelsByYearComponent implements OnInit, OnDestroy {
  modelByYearDataSource: ModelByYear[]=[];
  models:Model[]=[];
  selectedFile!: File | null;
  previewImageUrl: string | ArrayBuffer | null = null;
  @ViewChild('fileUploader', { static: false }) DxFileUploader!: any;
  @ViewChild('modelByYearGrid') modelByYearGrid!: any;


  constructor(private modelService:ModelService, private modelByYearService:ModelByYearService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.getModelsByYear();
    this.getModels();
  }

  ngOnDestroy(): void {
    this.modelService.ngOnDestroy();
    this.modelByYearService.ngOnDestroy();
  }

  getModelsByYear(id?:number,modelId?:number,includeAll?:boolean){
    this.modelByYearService.getModelsByYear(id,modelId,includeAll).subscribe(
      response =>{
        this.modelByYearDataSource = response;
        this.modelByYearGrid.instance.refresh();
      },
      error => {
        console.log(error);
      }
    )
  }

  getModels(){
    this.modelService.getModels().subscribe({
      next:(res)=>{
        this.models = res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  createModelsByYear(file: File, isActive:boolean, name:string, startYear:string,endYear:string,modelId:number): void {
    let formData = new FormData();
    formData.append('Name', name);
    formData.append('startYear', startYear);
    formData.append('endYear', endYear);
    formData.append('Active', String(isActive));
    formData.append('ModelId', String(modelId));

    if(file != null)
      formData.append('Image', file, file.name);
    
    this.modelByYearService.postModelByYear(formData).subscribe({
      next:(res)=>{
        this.getModelsByYear();
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

  onChangesSaved(e: any){
    if(e.changes.length > 0 && e.changes[0].type === 'insert')
      this.createModelsByYear(this.selectedFile!, e.changes[0].data.active, e.changes[0].data.name, e.changes[0].data.startYear,e.changes[0].data.endYear,e.changes[0].data.modelId);
    
    if(e.changes.length > 0 && e.changes[0].type === 'update')
      this.updateModelByYear(e.changes[0].data.id, this.selectedFile!, e.changes[0].data.active, e.changes[0].data.name, e.changes[0].data.startYear,e.changes[0].data.endYear,e.changes[0].data.modelId);
    
    this.previewImageUrl = null;
    this.selectedFile = null;
  }

  updateModelByYear(id:number, file: File, isActive:boolean, name:string, startYear:string, endYear:string, modelId:number) : void {
    let formData = new FormData();
    formData.append('Name', name);
    formData.append('startYear', startYear);
    formData.append('endYear', endYear);
    formData.append('Active', String(isActive));
    formData.append('ModelId', String(modelId));

    if(file != null)
      formData.append('Image', file, file.name);

    this.modelByYearService.putModelByYear(id, formData).subscribe({
      next:(res)=>{
        this.getModelsByYear();
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

  removeModelByYear(event:any){
    this.modelByYearService.removeModelByYear(event.key).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  onEditorPrep(e:any){
    if(!e.row.isNewRow && e.row.isEditing)
      this.previewImageUrl = e.row.data.imageUrl;
  }

  fileChanged(event: any) {
    this.selectedFile = event.value[0];
    const files: File[] = event.value;

    if (files.length > 0) {
        // Read the selected file and set the preview image
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.previewImageUrl = e.target.result;
        };
        reader.readAsDataURL(files[0]);
    } else {
        // No file selected, clear the preview
        this.previewImageUrl = null;
    }
  }

  onPopupHidden(){
    this.previewImageUrl = null;
    this.selectedFile = null;
  }
}
