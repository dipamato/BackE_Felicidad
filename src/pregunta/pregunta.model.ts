import mongoose from "mongoose";

export const PreguntaSchema= new mongoose.Schema({
    Numero: String,
    Item: String ,
    Factor: Number
});

export interface IPregunta extends mongoose.Document{
    Numero: string,
    Item: string,
    Factor:number
    
}

