import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IUserInfo } from "../user-info.model";
import { Model } from "mongoose";
import { UserInfoCrearDto } from "../dto/user-info.crear.dto";
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserInfoService{
    constructor(@InjectModel("UserInfo") private readonly userInfoModel: Model<IUserInfo>){}

    async Create(userInfoCrearDto:UserInfoCrearDto):Promise<IUserInfo>{
        const crear= new this.userInfoModel(userInfoCrearDto)
        return await crear.save()
    }

    async Consultar(): Promise<IUserInfo[]>{
        try {
            return this.userInfoModel.find().exec()
            
        } catch (Exception) {
            return null;
        }
    }

    async Modificar(id:string, userInfoCrearDto: UserInfoCrearDto): Promise<IUserInfo>{
        try {
           let info = this.userInfoModel.findByIdAndUpdate(id,userInfoCrearDto, {new:true}).exec()
            return info
            
        } catch (Exception) {
            return null;
        }
    }


    async GenerarInforme(response: any){
        try {
           const data=await this.Consultar()

           const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet('Datos');

      // Agrega los encabezados del informe basados en los campos del modelo UserInfo
           const headers = ['Tipo Felicidad', 'Dimension de la Felicidad', 'Definicion', 'Resultado'];
         worksheet.addRow(headers);
   

      // Agrega los datos al informe
      data.forEach((userInfo) => {
        const row = [
            ' FELICIDAD EUDAIMÓNICA EN EL TRABAJO',
            userInfo.DimensionFelicidad,
            userInfo.Definicion,
            userInfo.Resultado

        ]
        worksheet.addRow(row);
      });

          // Guarda el informe en el archivo especificado
          const filePath = path.join(require('os').homedir(), 'Downloads', 'Resultado_Encuesta_FeeT.xlsx');
    await workbook.xlsx.writeFile(filePath);

    // Envía el archivo como respuesta al cliente
    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    response.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);
    fs.createReadStream(filePath).pipe(response);

    console.log('Informe de Excel generado y descargado exitosamente.');

  } catch (error) {
    console.error('Error al generar el informe:', error);
    response.status(500).send('Error al generar el informe de Excel.');
  }
}
}