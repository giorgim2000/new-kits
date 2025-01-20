import { User } from "./User";
import { Courier } from "./courier";
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
    status?: number;
    paymentType?: number;
    orderProducts: OrdersProduct[] = [];
    discountAmount?: number;
    creationTime?: Date;
    withDelivery?:boolean;
    deliveryDate?: Date;
    deliveryId?: number;
    delivery?:Delivery;
    storeId?: number;
    amount?: number;
    invoiceId?:number;
    comment?:string;
    paid?:boolean;
}

export class OrderDto{
    id?:number;
    customerId?:number;
    customerName?:string;
    customerCode?:string;
    customerPhone?:string;
    status?:OrderStatus;
    paymentType?:PaymentType;
    orderProducts?:OrderProductDto[];
    delivery?:OrderDeliveryDto;
    amount?:number;
    creationTime?:Date;
    withDelivery?:boolean;
    storeName?:string;
    invoiceUrl?:string;
    statusString?:string;
    paymentTypeString?:string;
    paid?:boolean;
    comment?:string;
    removed?:boolean;
}

export interface OrderProductDto{
    orderProductId?:number;
    quantity?:number;
    product?:ProductDto;
    discount?:number;
    customWarranty?:number;
    price?:number;
}

export interface ProductDto{
    id?:number;
    finaId?:number;
    finaCode?:string;
    productName?:string;
}

export class CreateOrderDto {
    User?: OrderUserDto | null;
    PaymentType?: PaymentType | null;
    CreationTime?: Date | null;
    DeliveryDate?: Date | null;
    WithDelivery?: boolean | null;
    StoreId?: number | null;
    Paid?: boolean | null;
    Comment?: string | null;
    OrderProducts?: CreateOrderProductDto[] | null;
    Delivery?: OrderDeliveryDto | null;
}

export interface UpdateOrderDto{
    orderId?:number;
    orderStatus?:OrderStatus;
    paymentType?:PaymentType;
    delivery?:OrderDeliveryDto;
    withDelivery?:boolean;
    storeId?:number;
    removed?:boolean;
    orderProducts?:CreateOrderProductDto[];
}

export interface OrderDeliveryDto{
    id?:number;
    from?:string;
    to?:string;
    deliveryPrice?:number;
    deliveryDate?:Date;
    courierId?:number;
    cityId?:number;
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
    Registered?: boolean | null;
    Resident?:boolean | null;
}

export interface CreateOrderProductDto {
    ProductId?: number | null;
    Name?: string | null;
    FinaId?: number | null;
    Quantity?: number | null;
    Discount?: number | null;
    CustomWarranty?: number | null;
    Price?: number | null;
//    TotalSum?: number | null;
}

export enum OrderStatus {
    Recieved, Confirmed, Finished, Cancelled
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
    city?:City;
    cityId?:number;
}

export class City{
    id?:number;
    name?:string;
    deliveryPrice?:number;
}

export class CreateCityDto{
    name?:string;
    deliveryPrice?:number;
}

export class UpdateCityDto{
    id!:number;
    name?:string;
    deliveryPrice?:number;
}

export interface IUserOrder{
    orderId?:number;
    orderDate?:Date;
    status?:OrderStatus;
    paymentType?:PaymentType;
    sum?:number;
}

export function AddOrderColors(e:any){
    if(e.rowType == "data"){
        if(e.data.status == 0){
          e.rowElement.style.background = "white";
          e.rowElement.classList.add("white");
        }
          
  
        if(e.data.status == 1){
          e.rowElement.style.background = "rgb(233, 233, 32)";
          e.rowElement.classList.add("yellow");
        }
          
  
        if(e.data.status == 2){
          e.rowElement.style.background = "rgb(22, 160, 22)";
          e.rowElement.classList.add("green");
        }
         
  
        if(e.data.status == 3){
          e.rowElement.style.background = "rgb(207, 207, 207)";
          e.rowElement.classList.add("grey");
        }
      }
}

export function TransformOrderStatus(e:any){
    if(e.value == 0)
        return "მიღებული";
    
      if(e.value == 1)
        return "დადასტურებული";
    
      if(e.value == 2)
        return "დასრულებული";
    
      if(e.value == 3)
        return "გაუქმებული";
  
      return e.value;
}

export function OrderPaymentTypeTransformation(e:any){
    if(e.value == 0)
        return "ნაღდი";
    
      if(e.value == 1)
        return "გადარიცხვა";
    
      if(e.value == 2)
        return "ბარათი";
    
      if(e.value == 3)
        return "კონსიგნაცია";
  
      return e.value;
}