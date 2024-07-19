import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/Dto\'s/User';
import { Role } from 'src/app/Dto\'s/role';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrl: './users-panel.component.scss'
})
export class UsersPanelComponent implements OnInit, OnDestroy {
  usersDataSource:User[]=[];
  showOrders = false;
  userPriceTypeDataSource = [
    {id:0, name:"საცალო"},
    {id:1, name:"მცირე-საბითუმო"},
    {id:2, name:"საბითუმო"}
  ];
  userOrdersPopupVisible = false;
  selectedUserId : number | undefined;
  
  constructor(private userService:UserService){}

  ngOnDestroy(): void {
    this.userService.ngOnDestroy();
  }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe({
      next:(res:any)=>{
        this.usersDataSource = res;
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

  onChangesSaved(e:any){
    if(e.changes.length > 0){
      this.userService.updateUser(e.changes[0].data).subscribe({
        next:(res) => this.getUsers(),
        error:(err) => console.error(err)
      })
    }
      
  }

  onEditorPrep(e:any){
    
  }

  updateUser(e:any){

  }

  removeUser(e:any){
    this.userService.removeUser(e.key).subscribe({
      next:(res) => this.getUsers()
    })
  }

  closeUserOrdersPopup(){
    this.userOrdersPopupVisible = false;
  }
}
