import { Module } from '@nestjs/common';
import { RespuestasEController } from './respuestas-e.controller';
import { RespuestasESchema } from './respuestas-e.model';
import { MongooseModule } from '@nestjs/mongoose';
import { EncuestaSchema } from 'src/encuesta/encuesta.model';
import { RespuestasEService } from './service/respuestas-e.service';
import { EncuestaService } from 'src/encuesta/service/encuesta.service';
import { EscalaSchema } from 'src/escala/escala.model';
import { PreguntaSchema } from 'src/pregunta/pregunta.model';
import { PersonaSchema } from 'src/persona/persona.model';
import { PersonaService } from 'src/persona/service/persona.service';
import { RecursosColSchema } from 'src/recursos-col/recursos-col.model';
import { RecursosColService } from 'src/recursos-col/service/recursos-col.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RespuestasE', schema: RespuestasESchema },
      { name: 'Encuesta', schema: EncuestaSchema },
      { name: 'Escala', schema: EscalaSchema },
      { name: 'Pregunta', schema: PreguntaSchema },
      { name: 'Persona', schema: PersonaSchema},
      { name: 'RecursosCol', schema: RecursosColSchema },
    ]),
  ],
  controllers: [RespuestasEController],
  providers: [RespuestasEService, EncuestaService, PersonaService, RecursosColService],
})
export class RespuestasEModule {}
