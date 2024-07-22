import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Make } from 'src/app/Dto\'s/make';
import { Model } from 'src/app/Dto\'s/model';
import { MakeService } from 'src/app/services/make.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrl: './models.component.scss'
})
export class ModelsComponent implements OnInit, OnDestroy {
  modelDataSource: Model[] = [];
  makes:Make[]=[];
  selectedFile!: File | null;
  editMode:boolean=false;
  editingModelId:number|undefined;
  @ViewChild('fileUploader', { static: false }) DxFileUploader!: any;
  @ViewChild('modelGrid') modelGrid!: any;


  constructor(private modelService:ModelService,private makeService:MakeService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.getModels();
    this.getMakes();
  }

  ngOnDestroy(): void {
    this.modelService.ngOnDestroy();
  }

  getModels(){
    this.modelService.getModels().subscribe({
      next:(res)=>{
        this.modelDataSource = res;
        this.modelGrid.instance.refresh();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getMakes(){
    this.makeService.getMakes().subscribe({
      next:(res)=>{
        this.makes = res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  createModels(file: File, isActive:boolean, name:string,makeId:number): void {
    let formData = new FormData();
    formData.append('ModelName', name);
    formData.append('Active', String(isActive));
    formData.append('MakeId', String(makeId));
    formData.append('Image', file, file.name);
      
    this.modelService.postModel(formData).subscribe({
      next:(res)=>{
        this.getModels();
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

  onChangesSaved(e: any) {
    console.log(e);
    if(e.changes.length > 0 && e.changes[0].type === 'insert')
      this.createModels(this.selectedFile!,e.changes[0].data.active, e.changes[0].data.modelName, e.changes[0].data.makeId);

    if(this.editMode){
      if(e.changes.length > 0 && e.changes[0].type === 'update' && e.changes[0].data != undefined)
        this.updateModel(e.changes[0].data.id, this.selectedFile, e.changes[0].data.active, e.changes[0].data.modelName, e.changes[0].data.makeId);
      else{
        if(this.selectedFile != null)
          this.updateModel(this.editingModelId!, this.selectedFile);
      }
    }
    
    
    this.previewImageUrl = null;
    this.selectedFile = null;
    this.editMode = false;
    this.editingModelId = undefined;
  }

  updateModel(id:number, file:File | null, active?:boolean, name?:string, makeId?:number):void{
    let formData = new FormData();
    if(name != null)
      formData.append('ModelName', name);

    if(makeId != null)
      formData.append('MakeId', String(makeId));

    if(active != null)
      formData.append('Active', String(active));

    if(file != null)
      formData.append('Image', file, file.name);

    this.modelService.putModel(id, formData).subscribe({
      next:(res)=>{
        this.getModels();
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

  removeModel(event:any){
    this.modelService.removeModel(event.key).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  onEditorPrep(e:any){
    if(!e.row.isNewRow && e.row.isEditing){
      this.previewImageUrl = e.row.data.imageUrl;
      this.editMode = true;
      this.editingModelId = e.row.data.id;
    }
  }


  previewImageUrl: string | ArrayBuffer | null = null;

  fileChanged(event: any) {
    this.selectedFile = event.value[0];
    const files: File[] = event.value;

    if (files.length > 0) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.previewImageUrl = e.target.result;
        };
        reader.readAsDataURL(files[0]);
    } else {
        this.previewImageUrl = null;
    }
  }

  onPopupHidden(){
    this.previewImageUrl = null;
    this.selectedFile = null;
  }
}
