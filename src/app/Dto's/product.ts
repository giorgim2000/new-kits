import { CartService } from "../services/cart.service";
import { ModelByYear } from "./modelByYear";
import { Order } from "./order";

export class Product{
    id?:number;
    code?:string;
    barcode?:string;
    finaId?:number;
    finaCode?:string;
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
    rest?:number;
    imageUrls?: string[];
    warranty?:number;
    comingSoon?:boolean;
    active?:boolean;
    modelByYears?:ModelByYear[];
    modelsByYearIds?:number[];
    isInCart?:boolean;
    quantityInCart?:number;
}

export class CreateProduct{
    ProductName?:string;
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
    FinaCode?:string;
    Barcode?:string;
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

export class CreateProductModel{
    ProductId!:number;
    ModelByYearId!:number;
}

export class ProductModel{
    id!:number;
    productId!:number;
    modelByYearId!:number;
    productName!:string;
    modelByYearName!:string;
}

export class CartProduct{
    id!:number;
    name!:string;
    price!:number;
    quantity!:number;
    imageUrls?:string[];
}