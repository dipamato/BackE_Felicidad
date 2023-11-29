import { Body, Controller, Post } from '@nestjs/common';
import {MailService} from 'src/mail/service/mail.service'
import { IMail } from './mail.model';

@Controller('mail')
export class MailController {

    constructor(
        private readonly sendgridService: MailService 
      ){}

      @Post('send')
      async sendMail(@Body() body: any) {
        const { correo, data } = body;
    
        try {
          await this.sendgridService.Enviar(correo, data);
          return { message: 'Correo electrónico enviado exitosamente' };
        } catch (error) {
          console.error('Error al enviar el correo electrónico:', error);
          throw new Error('No se pudo enviar el correo electrónico');
        }
      }
    }
    
    
  
