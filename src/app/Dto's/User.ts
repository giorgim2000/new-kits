export class User{
    id:number;
    username:string;
    userIdNumber:string;
    firstName:string;
    lastName:string;
    phoneNumber:string;
    email:string;
    active:boolean;
    userPriceType:number;
    fullName?:string;

    constructor(id:number,username:string,userIdNumber:string,firstname:string,lastname:string,phoneNumber:string,email:string,active:boolean,userPriceType:number){
        this.id = id;
        this.username = username;
        this.firstName = firstname;
        this.lastName = lastname,
        this.userIdNumber = userIdNumber;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.active = active;
        this.userPriceType = userPriceType;
        this.fullName = `${this.firstName} ${this.lastName}`;
    }
}

export interface UserForAuthenticationDto {
    username: string;
    password: string;
}

export interface AuthResponseDto {
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
}