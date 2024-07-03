import { User } from "./User";
import { OrdersProduct } from "./product";

export class Order {
    id?: number;
    Firstname?:string;
    Lastname?:string;
    IdNumber?:string;
    Phone?:string;
    CompanyName?:string;
    CompanyNumber?:string;
    //user?: User;
    //userId?: number;
    //anonymousUser?: any;
    //anonymousUserId?: number;
    status?: OrderStatus;
    paymentType?: PaymentType;
    orderProducts: OrdersProduct[] = [];
    discountAmount?: number;
    creationTime?: Date;
    deliveryDate?: Date;
    delivery?: Delivery;
    deliveryId?: number;
    storeId?: number;
    amount?: number;
}

export enum OrderStatus {
    
}

export enum PaymentType {
    Cash, Transfer, Card
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