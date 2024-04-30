import { Model } from "./model";

export class ModelByYear{
    id?:number;
    modelId?:number;
    modelByYearName?: string;
    model?: Model;
    startYear!: number;
    endYear!: number;
    imageUrl?: string;
    active?:boolean;
    displayName?:string;

    constructor(){
        this.displayName = this.model?.modelName + ' ' + this.modelByYearName;
    }
}