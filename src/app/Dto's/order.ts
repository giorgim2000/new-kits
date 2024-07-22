import { User } from "./User";
import { OrdersProduct } from "./product";

export class Order {
    id?: number;
    userId?: number;
    Firstname?:string;
    Lastname?:string;
    IdNumber?:string;
    Phone?:string;
    CompanyName?:string;
    CompanyCode?:string;
    status?: OrderStatus;
    paymentType?: PaymentType;
    orderProducts: OrdersProduct[] = [];
    discountAmount?: number;
    creationTime?: Date;
    deliveryDate?: Date;
    deliveryId?: number;
    storeId?: number;
    amount?: number;
    invoiceId?:number;
}

export class OrderDto{

}

export class CreateOrderDto{

}

export enum OrderStatus {
    Recieved, Pending, Finished, Cancelled
}

export enum PaymentType {
    Cash, Transfer, Card
}

export enum UserPriceType{
    Retail, SemiWhole, Whole
}

export class Delivery {
    id?: number;
    from?: string;
    to?: string;
    deliveryPrice?: number;
    order?: Order;
    orderId?: number;
    courier?: Courier;
    courierId?: number;
}

export class Courier {
    id?: number;
    firstName?: string;
    lastName?: string;
    courierIdNumber?: string;
    phoneNumber?: string;
    deliveries?: Delivery[];
}

export interface IUserOrder{
    orderId?:number;
    orderDate?:Date;
    status?:OrderStatus;
    paymentType?:PaymentType;
    sum?:number;
}