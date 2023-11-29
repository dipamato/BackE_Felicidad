import mongoose from "mongoose";
import { IEscala } from "src/escala/escala.model";
import { IRecursosCol } from "src/recursos-col/recursos-col.model";

export const EncuestaSchema = new mongoose.Schema({
    Institucion: String,
    Sede: String,
    Regional: String,
    Centro: String,
    Facultad: String,
    Programa: String,
    Escalas: [{type: mongoose.SchemaTypes.ObjectId, ref: "Escala"}],
    RecursosCol: [{type: mongoose.SchemaTypes.ObjectId, ref: "RecursosCol"}],
    Fecha: { type: Date, default: Date.now },
    Persona: {type:mongoose.SchemaTypes.ObjectId, ref: "Persona"}

})

export interface IEncuesta extends mongoose.Document{
    Institucion: string,
    Sede: string,
    Regional: string;
    Centro: string;
    Facultad: string;
    Programa: string;
    Escalas: IEscala[],
    RecursosCol: IRecursosCol[],
    Fecha: Date,
    Persona: {},
    
}

