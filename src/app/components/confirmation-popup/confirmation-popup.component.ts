import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DxButtonModule, DxPopupModule } from 'devextreme-angular';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrl: './confirmation-popup.component.scss'
})
export class ConfirmationPopupComponent {
  @Input()confirmPopupVisible!:boolean;
  @Input()questionText!:string;
  @Input()confirmBtnText!:string;
  @Input()cancelBtnText!:string;
  @Output()closePopup = new EventEmitter<boolean>();


  close(e:boolean){
    this.confirmPopupVisible = false;
    this.closePopup.emit(e);
  }
}
