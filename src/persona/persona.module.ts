import { Module } from '@nestjs/common';
import { PersonaController } from './persona.controller';
import { Mongoose } from 'mongoose';
import { PersonaSchema } from './persona.model';
import { MongooseModule } from "@nestjs/mongoose";
import { PersonaService } from './service/persona.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Persona', schema: PersonaSchema}])],
  controllers: [PersonaController],
  providers:[PersonaService]
})
export class PersonaModule {}
