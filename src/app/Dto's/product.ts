import { ModelByYear } from "./modelByYear";
import { Order } from "./order";

export class Product{
    id?:number;
    code?:string;
    barcode?:string;
    finaId?:number;
    productName?:string;
    description?:string;
    retailPrice?:number;
    retailDiscount?:number;
    semiWholeSalePrice?:number;
    semiWholeSaleDiscount?:number;
    wholeSalePrice?:number;
    wholeSaleDiscount?:number;
    price?:number;
    discount?:number;
    inStockAmount?:number;
    imageUrls?: string[];
    warrantyMonths?:number;
    comingSoon?:boolean;
    active?:boolean;
    modelByYears?:ModelByYear[];
    modelsByYearIds?:number[];
}

export class CreateProduct{
    productName?:string;
    description?:string;
    retailPrice?:number;
    retailDiscount?:number;
    semiWholeSalePrice?:number;
    semiWholeSaleDiscount?:number;
    wholeSalePrice?:number;
    wholeSaleDiscount?:number;
    productImages?:File[];
    modelsByYearIds?:number[];
    warranty?:number;
    comingSoon?:boolean;
    active?:boolean;
    finaCode?:string;
    barcode?:string;
}

export class Store{
    id?:number;
    name?:string;
    adress?:string;
    productByStore?:ProductByStore[];
}

export class ProductByStore{
    id?:number;
    store?:Store;
    storeId?:number;
    product?:Product;
    productId?:number;
    productAmount?:number;
}

export class OrdersProduct {
    orderProductId?: number;
    product?: Product;
    productId?: number;
    quantity?: number;
    discount?: number;
    customWarranty?: number;
    price?: number;
    totalSum?: number;
    order?: Order;
    orderId?: number;
}