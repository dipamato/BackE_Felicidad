import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IPregunta } from "../pregunta.model";
import { Model } from "mongoose";
import { PreguntaCrearDto } from "../dto/pregunta.crear.dto";

@Injectable()
export class PreguntaService{
     
    constructor(@InjectModel("Pregunta")private readonly preguntaModel: Model<IPregunta>){}

    async Create(preguntaCrearDto:PreguntaCrearDto):Promise<IPregunta>{
        const crear= new this.preguntaModel(preguntaCrearDto)
        return await crear.save()
    }

    async Consultar(): Promise<IPregunta[]>{
        try {
            return this.preguntaModel.find().exec()
            
        } catch (Exception) {
            return null;
        }
    }

    async ConsultarUno(id:string): Promise<IPregunta>{
        try {
            return await this.preguntaModel.findById(id).exec()
            
        } catch (Exception) {
            return null;
        }
    }

    async Modificar(id:string, preguntaCrearDto: PreguntaCrearDto): Promise<IPregunta>{
        try {
            return await this.preguntaModel.findByIdAndUpdate(id,preguntaCrearDto, {new:true}).exec()
            
        } catch (Exception) {
            return null;
        }
    }

}