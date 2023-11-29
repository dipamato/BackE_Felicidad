import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IRespuestasE } from '../respuestas-e.model';
import { DataSizeOperatorReturningNumber, Model } from 'mongoose';
import { RespuestasECrearDto } from '../dto/respuestas-e-crear.dto';
import { IEncuesta } from 'src/encuesta/encuesta.model';
import { EncuestaService } from 'src/encuesta/service/encuesta.service';
import { IEscala } from 'src/escala/escala.model';

import { IPregunta } from 'src/pregunta/pregunta.model';
import { IPersona } from 'src/persona/persona.model';
import { PreguntaCrearDto } from 'src/pregunta/dto/pregunta.crear.dto';
import { PersonaCrearDto } from 'src/persona/dto/persona-crear.dto';
import { PersonaService } from 'src/persona/service/persona.service';
import { IRecursosCol } from 'src/recursos-col/recursos-col.model';
import { RecursosColService } from 'src/recursos-col/service/recursos-col.service';
import { RecursosColCrearDto } from 'src/recursos-col/dto/recursos-col.cear.dto';

@Injectable()
export class RespuestasEService {
  constructor(
    @InjectModel('RespuestasE')
    private readonly respuestasEModel: Model<IRespuestasE>,
    @InjectModel('Pregunta') private readonly preguntaModel: Model<IPregunta>,
    @InjectModel('Encuesta') private readonly encuestaModel: Model<IEncuesta>,
    @InjectModel('Escala') private readonly escalaModel: Model<IEscala>,
    @InjectModel('Persona') private readonly personaModel: Model<IPersona>,
    @InjectModel('RecursosCol') private readonly recursosColModel: Model<IRecursosCol>,
    private _personaService: PersonaService,
    private _encuestaService: EncuestaService,
    private _recursosColService: RecursosColService
  ) {}

  async Create(idEncuesta: string, _id: string): Promise<IRespuestasE> {
    const encuesta = await this._encuestaService.ConsultarEncuestaxId(
      idEncuesta,
    );
    const persona = await this._personaService.ConsultarxId(_id); // Carga la persona utilizando el ID
    const recursosCol  =await this._recursosColService.Consultar()
    const RespuestaNueva = new this.respuestasEModel({
      Institucion: encuesta.Institucion,
      Sede: encuesta.Sede,
      Persona: persona,
      RecursosCol: recursosCol.map((r)=>({
        Numero:r.Numero,
        Nombre: r.Nombre,
        Item: r.Item,
        Factor: r.Factor,
        Caso:r.Caso,
       
      })),
      Escalas: encuesta.Escalas.map((escala) => ({
        Dimension: escala.Dimension,
        Preguntas: escala.Preguntas.map((pregunta) => ({
          Numero: pregunta.Numero,
          Item: pregunta.Item,
          Factor: pregunta.Factor,
        })),
        Total: 0, // Inicialmente, el total es 0
      })),
      Fecha: new Date(encuesta.Fecha),
    });

    return await RespuestaNueva.save();
  }

  async Consultar(): Promise<IRespuestasE[]> {
    try {
      return this.respuestasEModel.find().exec();
    } catch (Exception) {
      return null;
    }
  }

  async ConsultarAll(): Promise<IRespuestasE[]> {
    try {
      return this.respuestasEModel.find()
        .populate({
          path: 'Persona',
          model: "Persona"// Reemplaza 'PersonaModel' con tu modelo real para 'Persona'
        })
        .populate({
          path: 'Escalas',
          model: "Escalas" // Reemplaza 'EscalasModel' con tu modelo real para 'Escalas'
        })
        .populate({
          path: 'RecursosCol',
          model: 'RecursosCol'// Reemplaza 'RecursosColModel' con tu modelo real para 'RecursosCol'
        })
        .exec();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  /** Método para consulta de la encuesta almacenada como objeto de respuesta*/

  async ConsultarRespuestaExId(id: string): Promise<IRespuestasE> {
    try {
      const respuestaE = await this.respuestasEModel
        .findById(id)
     
        .exec();
      return respuestaE;
    } catch (Exception) {
      return null;
    }
  }

  /** METODO QUE ME PERMITE ACTUALIZAR CUALQUIER VALOR DE LA RESPUESTAE */

  async UpdateRespuestasExId(
    id: string,
    idP: string,
    preguntacrearDto: PreguntaCrearDto,
  ): Promise<IRespuestasE> {
    try {
      // Buscar la respuestaE por su ID y la pregunta por su ID
      let respuestaE = await this.respuestasEModel
        .findById(id)
        .populate({
          path: 'Escalas',
        })
        .exec();
      console.log(respuestaE);
      if (respuestaE) {
        for (const escala of respuestaE.Escalas) {
          for (const pregunta of escala.Preguntas) {
            console.log(pregunta._id, 'idP: ', idP);
            if (pregunta._id == idP) {
              // Modificar el valor de la pregunta
              pregunta.Factor = preguntacrearDto.Factor; // Suponiendo que el valor a modificar es 'Factor'

              pregunta.markModified('Factor'); // Indicar a Mongoose que se ha modificado el campo 'Factor'

              break;
            }
          }
        }

        respuestaE = await respuestaE.save();
        return respuestaE;
      }
    } catch (error) {
      console.error(error);
      return null; // En caso de error
    }
  }

  /** METODO QUE ME ACUMULA EL TOTAL EN CADA ESCALA  */
  async UpdateTotal(id: string): Promise<IRespuestasE> {
    try {
      // Buscar la respuestaE por su ID y la pregunta por su ID
      let respuestaE = await this.respuestasEModel
        .findById(id)
        .populate({
          path: 'Escalas',
        })
        .exec();
      console.log(respuestaE);
      if (respuestaE) {
        for (const escala of respuestaE.Escalas) {
          let Total = 0;
          escala.Total = 0;
          for (const pregunta of escala.Preguntas) {
            const Factor = pregunta.Factor;
            Total = Total + Factor;
          }
          escala.Total = Total;
          escala.markModified('Total');
        }
      }

      respuestaE = await respuestaE.save();
      return respuestaE;
    } catch (error) {
      console.error(error);
      return null; // En caso de error
    }
  }

  //Consultar respuesta completa

  async ConsultarRespuestaExIdConPersona(id: string): Promise<IRespuestasE> {
    try {
      const respuestaE = await this.respuestasEModel
        .findById(id)
        .populate({
          path: 'Persona' 
          
        })
        .populate({
          path: 'Escalas'
        })
        .populate({
          path: 'RecursosCol'
        })
        
        .exec();
      return respuestaE;
    } catch (Exception) {
      return null;
    }
  }

  async ConsultarRespuestaExNombreIE(nombreIE: string,sede: string): Promise<IRespuestasE[]> {
    try {
      const respuestaE = await this.respuestasEModel
        .find({ Institucion: nombreIE , Sede:sede})
        .populate({
          path: 'Persona' 
          
        })
        .populate({
          path: 'Escalas'
        })
        
        .exec();
      return respuestaE;
    } catch (Exception) {
      return null;
    }
  }

  // METODO PARA ACTUALIZAR VALORES DE LOS RECULRSOS COL
  async UpdateRecursosColxId(
    id: string,
    idP: string,
    recursosColCrearDto: RecursosColCrearDto,
  ): Promise<IRespuestasE> {
    try {
      // Buscar la respuestaE por su ID y la pregunta por su ID
      let respuestaE = await this.respuestasEModel
        .findById(id)
        .populate({
          path: 'RecursosCol',
        })
        .exec();
      console.log(respuestaE);
      if (respuestaE) {
        for (const recurso of respuestaE.RecursosCol) {
            console.log(recurso._id, 'idPrecurso: ', idP);
            if (recurso._id == idP) {
              // Modificar el valor de la pregunta
              recurso.Factor = recursosColCrearDto.Factor; // Suponiendo que el valor a modificar es 'Factor'

              recurso.markModified('Factor'); // Indicar a Mongoose que se ha modificado el campo 'Factor'

              break;
            }
        }

        respuestaE = await respuestaE.save();
        return respuestaE;
      }
    } catch (error) {
      console.error(error);
      return null; // En caso de error
    }
  }
}
