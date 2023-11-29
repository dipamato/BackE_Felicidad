import mongoose from "mongoose"

export const PersonaSchema = new mongoose.Schema({
    Genero: String,
    Edad: Number,
    EstadoCivil: String,
    Hijos: String,
    Profesion: String,
    Especializacion: String,
    Experiencia: Number,
    Años_Vinculado: Number,
    Tipo_Vinculacion:String,
    Grado_Escalafon: String,
    Nivel_Enseñanza: String,
    Codigo:String,
    Correo: String,
    NombreApellidos:String,
    Cedula: String,
    Grupo:String,
    Rifa: Number

})

export interface IPersona extends mongoose.Document{
    Genero: string;
    Edad: number;
    Hijos: string;
    EstadoCivil: string;
    Profesion: string;
    Especializacion: string;
    Experiencia: number;
    Años_Vinculado: number;
    Tipo_Vinculacion:string;
    Grado_Escalafon: string;
    Nivel_Enseñanza: string;
    Codigo:string;
    Correo: string;
    NombreApellidos:string;
    Cedula: string;
    Grupo:string,
    Rifa: number
}