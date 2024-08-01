import { Make } from "./make";

export class Model{
    id?:number;
    modelName!: string;
    lineNum?:number;
    imageUrl?: string;
    makeId?:number;
    make?: Make;
    active?:boolean;
}