import { Injectable } from '@nestjs/common';
import { IEncuesta } from '../encuesta.model';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { EncuestaCrearDto } from '../dto/encuesta-crear.dto';
import { IEscala } from 'src/escala/escala.model';
import { PreguntaCrearDto } from 'src/pregunta/dto/pregunta.crear.dto';
import { IPregunta } from 'src/pregunta/pregunta.model';
import { v4 as uuidv4 } from 'uuid';
import { IRecursosCol } from 'src/recursos-col/recursos-col.model';

@Injectable()
export class EncuestaService {
  constructor(
    @InjectModel('Encuesta') private readonly encuestaModel: Model<IEncuesta>,
    @InjectModel('Escala') private readonly escalaModel: Model<IEscala>,
    @InjectModel('Pregunta') private readonly preguntaModel: Model<IPregunta>,
    @InjectModel('RecursosCol') private readonly recursosColModel: Model<IRecursosCol>,
  ) {}

  // Crea el registro de la enuesta agregando por defecto todas las simensiones y preguntas a cada una de las encuestas
 async Create(encuestaCrearDto: EncuestaCrearDto): Promise<IEncuesta> {
    const escalas = await this.escalaModel.find();
    const recursos=await this.recursosColModel.find()
    const recursosColEncuesta = recursos.map((recursos) => recursos.toObject());
    const escalasEncuesta = escalas.map((escala) => escala.toObject());
    const crear = new this.encuestaModel({
      ...encuestaCrearDto,
      Escalas: escalasEncuesta,
      RecursosCol: recursosColEncuesta
    },);
    return await crear.save();
  }



  // Consulta todo el registro de las encuestas
  async Consultar(): Promise<IEncuesta[]> {
    try {
      return this.encuestaModel.find().exec();
    } catch (Exception) {
      return null;
    }
  }



async ConsultarEncuestaxId(id: string): Promise<IEncuesta> {
  try {
    const encuesta = await this.encuestaModel
      .findById(id)
      .populate({
        path: 'Escalas', // Cambiar "Escalas" a "escalas"
        populate: {
          path: 'Preguntas', // Cambiar "Preguntas" a "preguntas"
          model: 'Pregunta'
        }
      })
      .exec();
    return encuesta;
  } catch (Exception) {
    return null;
  }
}

  async ModificarPreguntaxEncuesta(
    idEncuesta: string,
    idPregunta: string,
    preguntaCrearDto: PreguntaCrearDto,
  ): Promise<IEncuesta> {
    try {
      let encuesta: IEncuesta = await this.encuestaModel
        .findById(idEncuesta)
        .populate({
          path: 'Escalas',
          populate: {
            path: 'Preguntas',
            model: 'Pregunta',
          },
        })
        .exec();

      if (encuesta) {
        // Buscar la pregunta por su id dentro de la encuesta
        for (const escala of encuesta.Escalas) {
          for (const pregunta of escala.Preguntas) {
            if (pregunta._id.toString() === idPregunta) {
              // Modificar el valor de la pregunta
              pregunta.Factor = preguntaCrearDto.Factor; // Suponiendo que el valor a modificar es 'Factor'
              pregunta.markModified('Factor'); // Indicar a Mongoose que se ha modificado el campo 'Factor'
              break;
            }
          }
        }

        // Guardar los cambios en la encuesta
        encuesta = await encuesta.save();
        return encuesta;
      }

      return null; // Si no se encuentra la encuesta
    } catch (Exception) {
      return null; // En caso de error
    }
  }
  /* 
async ModificarPreguntaxEncuesta(
  idEncuesta: string,
  idPregunta: string,
  preguntaCrearDto: PreguntaCrearDto
): Promise<IEncuesta> {
  try {
    const encuesta = await this.encuestaModel
      .findById(idEncuesta)
      .populate({
        path: 'Escalas',
        populate: {
          path: 'Preguntas',
          model: 'Pregunta',
        },
      })
      .exec();

    if (encuesta) {
      const pregunta = encuesta.Escalas.flatMap((escala) =>
        escala.Preguntas.find((pregunta) => pregunta._id.toString() === idPregunta)
      );

      if (pregunta) {
        await this.preguntaModel.findByIdAndUpdate(
          idPregunta,
          { Factor: preguntaCrearDto.Factor },
          { new: true }
        );

        return encuesta;
      }
    }

    return null; // Si no se encuentra la encuesta o la pregunta
  } catch (error) {
    console.error(error);
    return null; // En caso de error
  }
}*/
}
