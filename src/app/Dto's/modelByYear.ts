import { Model } from "./model";

export class ModelByYear{
    id?:number;
    Name!:string;
    modelId?:number;
    modelByYearName?: string;
    model?: Model;
    startYear!: number;
    endYear!: number;
    imageUrl?: string;
    active?:boolean;
}