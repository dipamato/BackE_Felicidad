import mongoose from "mongoose";

export const RecursosColSchema= new mongoose.Schema({
    Numero: String,
    Caso:Number,
    Nombre: String,
    Item: String ,
    Factor: Number,
    
});

export interface IRecursosCol extends mongoose.Document{
    Numero: string,
    Caso:Number,
    Nombre: string,
    Item: string,
    Factor:number,
   

    
}