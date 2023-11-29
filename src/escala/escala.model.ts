import mongoose from "mongoose";
import { IPregunta } from "src/pregunta/pregunta.model";

export const EscalaSchema= new mongoose.Schema({
    Dimension: String,
    Preguntas: [{type: mongoose.SchemaTypes.ObjectId, ref: "Pregunta"}],
    Total: Number
})

export interface IEscala extends mongoose.Document{
    Dimension: string;
    Preguntas: IPregunta[];
    Total: number
}

