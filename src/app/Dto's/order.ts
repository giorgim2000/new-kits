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

export interface CreateOrderDto {
    User?: OrderUserDto | null;
    PaymentType?: PaymentType | null;
    CreationTime?: Date | null;
    DeliveryDate?: Date | null;
    WithDelivery?: boolean | null;
    StoreId?: number | null;
    StoreName?: string | null;
    Amount?: number | null;
    OrderProducts?: CreateOrderProductDto[] | null;
}

export interface OrderUserDto {
    Id?: number | null;
    FinaId?: number | null;
    UserIdNumber?: string | null;
    UserName?: string | null;
    FirstName?: string | null;
    LastName?: string | null;
    Address?: string | null;
    CompanyName?: string | null;
    CompanyCode?: string | null;
    IsCompany?: boolean | null;
    Email?: string | null;
    PhoneNumber?: string | null;
    Resident?: boolean | null;
    Registered?: boolean | null;
}

export interface CreateOrderProductDto {
    ProductId?: number | null;
    FinaId?: number | null;
    Quantity?: number | null;
    Discount?: number | null;
    CustomWarranty?: number | null;
    Price?: number | null;
    TotalSum?: number | null;
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