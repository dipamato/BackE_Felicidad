

import { Injectable } from "@nestjs/common";
import {InjectModel} from '@nestjs/mongoose'
import { IEscala } from "./../escala.model";
import { Model } from "mongoose";
import { EscalaCrearDto } from "./../dto/escala-crear.dto";
import { PreguntaCrearDto } from "src/pregunta/dto/pregunta.crear.dto";

@Injectable()
export class EscalaService{

    constructor(@InjectModel("Escala") private readonly escalaModel: Model<IEscala>){} // Modelo que conectara con la base de datos (Repositorio)


    //Generación del CRUD y de los métodos para las consultas a la BD teniendo en cuenta que para ello necesitamos el DTO

    async Create(escalaCrearDto: EscalaCrearDto):Promise <IEscala>{
        const crear = new this.escalaModel(escalaCrearDto)
        return await crear.save()
    }

    async Consultar(): Promise<IEscala[]>{
        try {
            return this.escalaModel.find().exec()
            
        } catch (Exception) {
            return null;
        }

    }

    async ConsultarUno(id:string): Promise<IEscala>{
        try {
            return await this.escalaModel.findById(id).exec()
            
        } catch (Exception) {
            return null;
        }
    }

    async Modificar(id:string, escalaCrearDto: EscalaCrearDto): Promise<IEscala>{
        try {
            return await this.escalaModel.findByIdAndUpdate(id,escalaCrearDto, {new:true}).exec()
            
        } catch (Exception) {
            return null;
        }
    }
    
    async adicionarPregunta(dim:string, escalaCrearDto:EscalaCrearDto):Promise<EscalaCrearDto>{
        try {
          const query={Dimension: dim}
          let respuesta= await this.escalaModel.findOneAndUpdate(query,{ $push: { 'Preguntas': escalaCrearDto.Preguntas}}).exec();
          //respuesta.item.push(items)
          return respuesta.save()
      } catch (Exception) {
          return null;
      }
      }
    
      async ConsultarUnoxDimension(dim:string): Promise<IEscala>{
        try {
            const query={Dimension: dim}
            return (await this.escalaModel.findOne(query).exec()).populate("Preguntas")
            
        } catch (Exception) {
            return null;
        }
    }

    async getEscalaWithPregunta():Promise <IEscala[]>{
        try {
            return this.escalaModel.find().populate("Preguntas")
            
        } catch (Exception) {
            return null;
        }
    }

}