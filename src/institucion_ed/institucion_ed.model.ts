import mongoose from "mongoose";


export const Institucion_EdSchema= new mongoose.Schema({
    Nombre: String,
    Sedes: [{type: mongoose.SchemaTypes.ObjectId, ref:"Sede"}],
    Municipio: String
})

export interface IInstitucion_Ed extends mongoose.Document{
    Nombre: string,
    Sedes: [],
    Municipio: string
}