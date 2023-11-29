import { Body, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';
import 'dotenv/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserInfo } from 'src/user-info/user-info.model';
import { UserInfoService } from 'src/user-info/service/user-info.service';
import * as fs from 'fs';
import { IMail } from '../mail.model';
import { saveAs } from 'file-saver';

const SG= process.env.SENDGRID_API_KEY;

@Injectable()
export class MailService{
    constructor (private readonly configService: ConfigService,
        private readonly userService:UserInfoService,
        @InjectModel("UserInfo") private readonly userInfoModel: Model<IUserInfo>){
        sgMail.setApiKey((SG)) 
    }

    async Enviar(correo: any, data: any) {
      const attachment = {
        filename: 'Resultado HAW.pdf',
        content: data.contenidoTabla, // El archivo ya está en formato base64
        type: 'application/pdf',
        disposition: 'attachment',
      };
  
      const mail: sgMail.MailDataRequired = {
        to: correo.to,
        from: correo.from,
        subject: correo.subject,
        text: correo.text,
        html: correo.html,
        attachments: [attachment],
      };
  
      sgMail
        .send(mail)
        .then(() => {
          console.log('Correo electrónico enviado exitosamente');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }