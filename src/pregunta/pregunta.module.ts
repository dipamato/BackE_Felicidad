import { Module } from '@nestjs/common';
import { PreguntaController } from './pregunta.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PreguntaSchema } from './pregunta.model';
import { PreguntaService } from './service/pregunta.service';

@Module({
  imports:[MongooseModule.forFeature([{name:'Pregunta', schema: PreguntaSchema}])],
  controllers: [PreguntaController],
  providers: [PreguntaService]
})
export class PreguntaModule {}
