import { Delivery } from "./order";

export interface CourierDto{
    Id?:number;
    firstName?:string;
    lastName?:string;
    phoneNumber?:string;
    courierIdNumber?:string;
    carNumber?:string;
}

export class Courier {
    id?: number;
    firstName?: string;
    lastName?: string;
    courierIdNumber?: string;
    phoneNumber?: string;
    carNumber?:string;
    deliveries?: Delivery[];
}

export class TransferItem{
    crDate?:Date;
    dueDate?:Date;
    transferred?:boolean;
    active?:boolean;
    orderId?:number;
    productId?:number;
}

export class TransferItemDto{
    id?:number;
    crDate?:Date;
    dueDate?:Date;
    transferred?:boolean;
    active?:boolean;
    orderId?:number;
    productId?:number;
    productCode?:string;
    productName?:string;
    storeId?:number;
    storeName?:string;
    storeAddress?:string;
}

export class GetTrItemQuery{
    fromDate?:Date;
    toDate?:Date;
    completed?:boolean;
    notCompleted?:boolean;
    orderId?:number;
    storeId?:number;
}

export class CreateTrItemDto{
    crDate?:Date;
    dueDate?:Date;
    orderId?:number;
    productId?:number;
}

export class UpdateTrItemsDto{
    ids?:number[];
    transferred?:boolean;
}