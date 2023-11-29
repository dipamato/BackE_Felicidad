import { Injectable } from "@nestjs/common";
import { IPersona } from "../persona.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PersonaCrearDto } from "../dto/persona-crear.dto";

@Injectable()
export class PersonaService{
    constructor(@InjectModel("Persona")private readonly personaModel: Model<IPersona>){} // Modelo que conectara con la base de datos (Repositorio)


     //Generación del CRUD y de los métodos para las consultas a la BD teniendo en cuenta que para ello necesitamos el DTO
     
     async Create (personaCrearDto: PersonaCrearDto): Promise <IPersona> {
        const crear = new this.personaModel(personaCrearDto)
        return await crear.save()
     }

  async Modificar(id:string, personaCrearDto: PersonaCrearDto): Promise<IPersona>{
      try {
          return await this.personaModel.findByIdAndUpdate(id,personaCrearDto, {new:true}).exec()
          
      } catch (Exception) {
          return null;
      }
  }
 
  async Consultar(): Promise<IPersona[]>{
    try {
        return this.personaModel.find().exec()
        
    } catch (Exception) {
        return null;
    }
  }
  
  async ConsultarxId(id:string): Promise<IPersona>{
    try {
        return this.personaModel.findById(id).exec()
        
    } catch (Exception) {
        return null;
    }
}
}
