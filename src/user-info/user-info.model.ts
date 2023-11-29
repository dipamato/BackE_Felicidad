
import mongoose from "mongoose";

export const UserInfoSchema= new mongoose.Schema({

    TipoFelicidad:String,
    DimensionFelicidad: String,
    Definicion: String,
    Resultado: String

})

export interface IUserInfo extends mongoose.Document{
    TipoFelicidad:string,
    DimensionFelicidad: string,
    Definicion: string,
    Resultado:string
}