import { Delivery } from "./order";

export interface CourierDto{
    Id?:number;
    firstName?:string;
    lastName?:string;
    phoneNumber?:string;
    courierIdNumber?:string;
}

export class Courier {
    id?: number;
    firstName?: string;
    lastName?: string;
    courierIdNumber?: string;
    phoneNumber?: string;
    deliveries?: Delivery[];
}

