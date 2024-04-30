import { Make } from "./make";

export class Model{
    id?:number;
    modelName!: string;
    imageUrl?: string;
    makeId?:number;
    make?: Make;
    active?:boolean;
}