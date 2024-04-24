import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imgPath:any[]=[];
  modelsDataSource:any[]=[];

  constructor(private _sanitizer: DomSanitizer, private _client: HttpClient) { }

  ngOnInit(): void {
    //this.getImages();
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