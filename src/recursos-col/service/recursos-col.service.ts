import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IRecursosCol } from "../recursos-col.model";
import { RecursosColCrearDto } from "../dto/recursos-col.cear.dto";

@Injectable()
export class RecursosColService{

    constructor(@InjectModel("RecursosCol") private readonly recursosColModel: Model<IRecursosCol>){}

    async Create (recursosColCrearDto: RecursosColCrearDto):Promise<IRecursosCol>{
        const crear = new this.recursosColModel(recursosColCrearDto)
        return await crear.save()
    }

    async Consultar(): Promise<IRecursosCol[]>{
        try {
            return this.recursosColModel.find().exec()
            
        } catch (Exception) {
            return null;
        }
    }

}