import { Module } from '@nestjs/common';
import { EncuestaController } from './encuesta.controller';
import { EncuestaSchema } from './encuesta.model';
import { MongooseModule } from '@nestjs/mongoose';
import { EncuestaService } from './service/encuesta.service';
import { EscalaSchema } from 'src/escala/escala.model';
import { PreguntaSchema } from 'src/pregunta/pregunta.model';
import { RecursosColSchema } from 'src/recursos-col/recursos-col.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Encuesta', schema: EncuestaSchema },
      { name: 'Escala', schema: EscalaSchema },
      
      { name: 'Pregunta', schema: PreguntaSchema },
      { name: 'RecursosCol', schema: RecursosColSchema }
    ]),
  ],
  controllers: [EncuestaController],
  providers: [EncuestaService],
})
export class EncuestaModule {}
