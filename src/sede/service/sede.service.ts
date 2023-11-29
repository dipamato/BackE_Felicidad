import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ISede } from "../sede.model";
import { SedeCrearDto } from "../dto/sede.crear.dto";


@Injectable()
export class SedeService{
    constructor(@InjectModel("Sede") private readonly sedeModel: Model<ISede>){}

    async Create (sedeCrearDto: SedeCrearDto):Promise<ISede>{
        const crear = new this.sedeModel(sedeCrearDto)
        return await crear.save()
    }

    async Consultar(): Promise<ISede[]>{
        try {
            return await this.sedeModel.find().exec()
        } catch (Exception) {
            return null
        }
    }

    
    async ConsultarUno(id:string):Promise<ISede>{
        try {
            return await this.sedeModel.findById(id).exec()
            
        } catch (Exception) {
            return null;
        }
    }

    async Modificar(id: string, sedeCrearDto: SedeCrearDto): Promise <ISede>{
        try {
            return await this.sedeModel.findByIdAndUpdate(id,sedeCrearDto, {new:true}).exec()
            
        } catch (Exception) {
            return null;
        }
    }
}

