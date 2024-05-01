import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
export class ModelsByYearComponent implements OnInit {
  modelByYearDataSource: ModelByYear[]=[];
  models:Model[]=[];
  selectedFile!: File | null;
  Name:string | undefined;
  startYear:Date | number | undefined;
  endYear:Date | number | undefined;
  selectedModel:number|undefined;
  @ViewChild('fileUploader', { static: false }) DxFileUploader!: any;
  @ViewChild('modelByYearGrid') modelByYearGrid!: any;


  constructor(private modelService:ModelService,private makeService:MakeService, private modelByYearService:ModelByYearService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.getModelsByYear();
    this.getModels();
  }

  ngOnDestroy(): void {
    this.modelService.ngOnDestroy();
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

  getMakes(){
    this.makeService.getMakes().subscribe({
      next:(res)=>{
        //this.makes = res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  createModelsByYear(file: File, isActive?:boolean): void {
    console.log(file);
    let formData = new FormData();
    formData.append('Name', this.Name!);
    formData.append('startYear', String(this.startYear!));
    formData.append('endYear', String(this.endYear));
    formData.append('Active', String(isActive!));
    formData.append('ModelId', String(this.selectedModel));

    if(file != null)
      formData.append('Image', file, file.name);
    
    console.log(formData);
    this.modelByYearService.postModelByYear(formData).subscribe({
      next:(res)=>{
        this.getModelsByYear();
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

  onChangesSaved(e: any) {
    console.log(e);
    console.log(this.editMode);
    console.log(e.changes[0].data != undefined);
    console.log(e.changes.length > 0 && e.changes[0].type === 'update');
    
    if(e.changes.length > 0 && e.changes[0].type === 'insert'){
      this.Name = e.changes[0].data.name;
      this.startYear = e.changes[0].data.startYear;
      this.endYear = e.changes[0].data.endYear;
      this.createModelsByYear(this.selectedFile!, e.changes[0].data.active);
    }
    
    if(this.editMode){
      if(e.changes.length > 0 && e.changes[0].type === 'update'){
        this.Name = e.changes[0].data.name;
        this.startYear = e.changes[0].data.startYear;
        this.endYear = e.changes[0].data.endYear;                                             
        this.editingActive = e.changes[0].data.active;
      }
      console.log("moida")
      this.updateModelByYear(this.selectedFile!, this.editingActive);
    }
    
    this.Name = undefined;
    this.startYear = undefined;
    this.endYear = undefined;
    this.editMode = false;
    this.previewImageUrl = null;
    this.selectedFile = null;
  }

  updateModelByYear(file:File, active?:boolean):void{
    let formData = new FormData();
    formData.append('Name', this.Name!);
    formData.append('startYear', String(this.startYear!));
    formData.append('endYear', String(this.endYear!));
    formData.append('Active', String(active));
    formData.append('ModelId', String(this.selectedModel));

    if(file != null)
      formData.append('Image', file, file.name);

    this.modelByYearService.putModelByYear(this.editingId, formData).subscribe({
      next:(res)=>{
        this.getModelsByYear();
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

  onsave(e:any,i?:any){
    console.log(e);
    console.log(i);
  }

  clic(e:any){
    console.log("BTNCLICK");
    console.log(e);
  }

  fileChange(e:any){
    console.log(e);
    this.selectedFile = e.value[0];
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
    console.log(e);
    if(!e.row.isNewRow && e.row.isEditing){
      this.editingId = e.row.data.id;
      this.Name = e.row.data.name;
      this.startYear = e.row.data.startYear;
      this.endYear = e.row.data.endYear;
      this.editingActive = e.row.data.active;
      this.selectedModel = e.row.data.modelId;
      this.editMode = true;
      this.previewImageUrl = e.row.data.imageUrl;
    }
  }

  editModelValChanged(e:any){
    console.log(e);
    this.selectedModel = e.value;
  }


  previewImageUrl: string | ArrayBuffer | null = null;
  editMode:boolean=false;
  editingId!:number;
  editingActive:boolean|undefined;

  fileChanged(event: any) {
    console.log(event);
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
    console.log(this.selectedFile);
  }
}
