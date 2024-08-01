import { Model } from "./model";

export class ModelByYear{
    id?:number;
    name!:string;
    modelId?:number;
    modelByYearName?: string;
    model?: Model;
    startYear!: number;
    endYear!: number;
    imageUrl?: string;
    active?:boolean;
    lineNum?:number;
}