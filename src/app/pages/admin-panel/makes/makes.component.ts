import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MakeService } from 'src/app/services/make.service';

@Component({
  selector: 'app-makes',
  templateUrl: './makes.component.html',
  styleUrl: './makes.component.scss'
})
export class MakesComponent {
  makeDataSource: any;
  selectedFile!: File | null;
  makeName!:string | undefined;
  @ViewChild('fileUploader', { static: false }) DxFileUploader!: any;
  @ViewChild('makeGrid') makeGrid!: any;


  constructor(private makeService:MakeService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.getMakes();
  }

  ngOnDestroy(): void {
    this.makeService.ngOnDestroy();
  }

  getMakes(){
    this.makeService.getMakes().subscribe({
      next:(res)=>{
        this.makeDataSource = res;
        this.makeGrid.instance.refresh();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  createMake(file: File, isActive:boolean = true): void {
    let formData = new FormData();
    formData.append('MakeName', this.makeName!);
    formData.append('Active', 'true');

    if(file != null)
      formData.append('Image', file, file.name);
    
    this.makeService.postMake(formData).subscribe({
      next:(res)=>{
        this.getMakes();
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

  onChangesSaved(e: any) {
    console.log(e);
    if(e.changes.length > 0 && e.changes[0].type === 'insert'){
      this.makeName = e.changes[0].data.makeName;
      this.createMake(this.selectedFile!);
    }
    
    if(this.editMode){
      if(e.changes.length > 0 && e.changes[0].type === 'update'){
        if(e.changes[0].data != undefined){
          this.makeName = e.changes[0].data.makeName;
          this.editingActive = e.changes[0].data.active;
        }
      }
      this.updateMake(this.selectedFile!, this.editingActive);
    }
    
    this.makeName = undefined;
    this.editMode = false;
    this.previewImageUrl = null;
    this.selectedFile = null;
  }

  updateMake(file:File, active:boolean | undefined):void{
    let formData = new FormData();
    formData.append('MakeName', this.makeName!);

    if(active != undefined)
      formData.append('Active', String(active));

    if(file != null)
      formData.append('Image', file, file.name);

    this.makeService.putMake(this.editingId, formData).subscribe({
      next:(res)=>{
        this.getMakes();
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

  removeMake(event:any){
    this.makeService.removeMake(event.key).subscribe({
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
      this.makeName = e.row.data.makeName;
      this.editingActive = e.row.data.active;
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
