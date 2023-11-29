import mongoose from "mongoose";
import { IEscala } from "src/escala/escala.model";
import { IPersona  } from "src/persona/persona.model";
import { IRecursosCol } from "src/recursos-col/recursos-col.model";

export const RespuestasESchema = new mongoose.Schema({

    Institucion: String,
    Sede: String,
    Regional: String,
    Centro: String,
    Facultad: String,
    Programa: String,
    Persona:{type:mongoose.SchemaTypes.ObjectId, ref:"Persona"},
    Escalas: [
        {
            Dimension: String,
            Preguntas: [{
                Numero: String,
                Item: String,
                Factor: Number
            }],
            Total: Number
        }
    ],
    RecursosCol:[
        {
        Nombre: String,
        Factor: Number,
        Item: String,
        Caso:Number,
    }],
    Fecha: { type: Date, default: Date.now }
})

export interface IRespuestasE extends mongoose.Document{

    Institucion: string;
    Sede: string;
    Regional: string;
    Centro: string;
    Facultad: string;
    Programa: string;
    Persona:IPersona;
    Escalas: IEscala[];
    RecursosCol:IRecursosCol[];
    Fecha: Date
}

