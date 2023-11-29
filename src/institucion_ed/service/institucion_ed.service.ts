import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IInstitucion_Ed } from "../institucion_ed.model";
import { Institucion_EdCrearDto } from "../dto/institucion_ed-crear.dto";


@Injectable()
export class Institucion_EdService{
    constructor(@InjectModel("Institucion") private readonly institucion_edModel: Model<IInstitucion_Ed>){}

    async Create(institucion_edCrearDto: Institucion_EdCrearDto):Promise <IInstitucion_Ed>{
        const crear = new this.institucion_edModel(institucion_edCrearDto)
        return await crear.save()
    }
    async Consultar(): Promise<IInstitucion_Ed[]>{
        try {
            return this.institucion_edModel.find().exec()
            
        } catch (Exception) {
            return null;
        }
    }
    async Modificar(id:string, institucion_edCrearDto: Institucion_EdCrearDto): Promise<IInstitucion_Ed>{
        try {
            return await this.institucion_edModel.findByIdAndUpdate(id,institucion_edCrearDto, {new:true}).exec()
            
        } catch (Exception) {
            return null;
        }
    }
    async adicionarSede(IE:string, institucion_edCrearDto:Institucion_EdCrearDto):Promise<Institucion_EdCrearDto>{
        try {
          const query={Nombre: IE }
          let respuesta= await this.institucion_edModel.findOneAndUpdate(query,{ $push: { 'Sedes': institucion_edCrearDto.Sedes}}).exec();
          //respuesta.item.push(items)
          return respuesta.save()
      } catch (Exception) {
          return null;
      }
      }

      async ConsultarUnoxSede(IE:string): Promise<IInstitucion_Ed>{
        try {
            const query={Nombre: IE}
            return (await this.institucion_edModel.findOne(query).exec()).populate("Sedes")
            
        } catch (Exception) {
            return null;
        }
    }

      async getIEWithSede():Promise <IInstitucion_Ed[]>{
        try {
            return this.institucion_edModel.find().populate("Sedes")
            
        } catch (Exception) {
            return null;
        }
    }

    async adicionarSedexIdIE(id:string, institucion_edCrearDto:Institucion_EdCrearDto):Promise<Institucion_EdCrearDto>{
        try {
          const query={_id: id }
          let respuesta= await this.institucion_edModel.findByIdAndUpdate(query,{ $push: { 'Sedes': institucion_edCrearDto.Sedes}}).exec();
          //respuesta.item.push(items)
          return respuesta.save()
      } catch (Exception) {
          return null;
      }
      }
}
