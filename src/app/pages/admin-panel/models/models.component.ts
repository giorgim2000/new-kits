import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Make } from 'src/app/Dto\'s/make';
import { Model } from 'src/app/Dto\'s/model';
import { MakeService } from 'src/app/services/make.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrl: './models.component.scss'
})
export class ModelsComponent implements OnInit {
  modelDataSource: Model[] = [];
  makes:Make[]=[];
  selectedFile!: File | null;
  modelName!:string | undefined;
  selectedMake:number | undefined;
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

  createModels(file: File, isActive:boolean = true): void {
    let formData = new FormData();
    formData.append('ModelName', this.modelName!);
    formData.append('Active', 'true');
    formData.append('MakeId', this.selectedMake!.toString());

    if(file != null)
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
    
    if(e.changes.length > 0 && e.changes[0].type === 'insert'){
      this.modelName = e.changes[0].data.modelName;
      this.createModels(this.selectedFile!);
    }
    
    if(this.editMode){
      if(e.changes.length > 0 && e.changes[0].type === 'update'){
        if(e.changes[0].data != undefined){
          this.modelName = e.changes[0].data.modelName;
          this.editingActive = e.changes[0].data.active;
        }
      }
      this.updateModel(this.selectedFile!, this.editingActive);
    }
    
    this.modelName = undefined;
    this.editMode = false;
    this.previewImageUrl = null;
    this.selectedFile = null;
  }

  updateModel(file:File, active:boolean | undefined):void{
    let formData = new FormData();
    formData.append('ModelName', this.modelName!);
    formData.append('MakeId', this.selectedMake!.toString());

    if(active != undefined)
      formData.append('Active', String(active));

    if(file != null)
      formData.append('Image', file, file.name);

    this.modelService.putModel(this.editingId, formData).subscribe({
      next:(res)=>{
        this.getModels();
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

  makeValChanged(e:any){
    console.log(e);
    this.selectedMake = e.value;
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
      this.editingId = e.row.data.id;
      this.modelName = e.row.data.modelName;
      this.editingActive = e.row.data.active;
      this.selectedMake = e.row.data.makeId;
      this.editMode = true;
      this.previewImageUrl = e.row.data.imageUrl;
    }
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
  }
}
