import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EscalaModule } from './escala/escala.module';
import { PreguntaModule } from './pregunta/pregunta.module';
import { PersonaModule } from './persona/persona.module';
import { SedeModule } from './sede/sede.module';
import { InstitucionEdModule } from './institucion_ed/institucion_ed.module';
import { EncuestaModule } from './encuesta/encuesta.module';
import { RespuestasEModule } from './respuestas-e/respuestas-e.module';
import { MailModule } from './mail/mail.module';
import { UserInfoModule } from './user-info/user-info.module';
import { RecursosColModule } from './recursos-col/recursos-col.module';
import 'dotenv/config';



const URL = process.env.MONGODB;  

@Module({
  imports: [
    MongooseModule.forRoot(URL),
    EscalaModule,
    PreguntaModule,
    PersonaModule,
    SedeModule,
    InstitucionEdModule,
    EncuestaModule,
    RespuestasEModule,
    MailModule,
    UserInfoModule,
    RecursosColModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
