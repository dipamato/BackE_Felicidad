import mongoose from 'mongoose'

export const SedeSchema= new mongoose.Schema({
    Nombre : String,
    Zona: String,
    Jornada: String,
    Nivel: String,
    Modelo: String,
    Municipio: String
})

export interface ISede extends mongoose.Document{
    Nombre : string,
    Zona: string,
    Jornada: string,
    Nivel: string,
    Modelo: string,
    Municipio: string
}