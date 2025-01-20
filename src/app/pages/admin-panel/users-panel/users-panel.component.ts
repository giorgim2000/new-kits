import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, switchMap } from 'rxjs';
import { User } from 'src/app/Dto\'s/User';
import { IUserOrder } from 'src/app/Dto\'s/order';
import { Role } from 'src/app/Dto\'s/role';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrl: './users-panel.component.scss'
})
export class UsersPanelComponent implements OnInit, OnDestroy {
  usersDataSource:User[]=[];
  userPriceTypeDataSource = [
    {id:0, name:"საცალო"},
    {id:1, name:"მცირე-საბითუმო"},
    {id:2, name:"საბითუმო"}
  ];
  userOrdersPopupVisible = false;
  selectedUserId : number | undefined;
  selectedUserOrders: IUserOrder[] = [];
  isCompany = false;
  
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

  showOrders = (e:any) => {
    this.selectedUserId = e.row.data.id;
    this.selectedUserOrders = e.row.data.orders;
    this.userOrdersPopupVisible = true;
  }

  onChangesSaved(e:any){
    if(e.changes.length > 0 && e.changes[0].type != "remove"){
      this.userService.updateUser(e.changes[0].data).subscribe({
        next:(res) => this.getUsers(),
        error:(err) => console.error(err)
      })
    }
  }

  removeUser(e:any){
    this.userService.removeUser(e.key).subscribe().add(()=>{
      this.getUsers();
    })
  }

  closeUserOrdersPopup(){
    this.userOrdersPopupVisible = false;
  }
}
