import mongoose from "mongoose";


const MailSchema = new mongoose.Schema({
      to: String,
      subject: String,
      from:String,
      text: String,
      html: String,
      //attachments: [String], // Array de objetos adjuntos
})


export interface IMail extends mongoose.Document{
      to: string;
      subject:string ;
      from:string;
      text: string;
      html: string
      //attachments: string[]; // Array de objetos adjuntos
}

const MailModel = mongoose.model<IMail>('Mail', MailSchema);