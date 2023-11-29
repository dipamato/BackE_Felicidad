import { Module } from '@nestjs/common';
import { EscalaController } from './escala.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { EscalaSchema } from "./escala.model";
import { EscalaService } from './service/escala.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Escala', schema: EscalaSchema }]),
  ],
  controllers: [EscalaController],
  providers:[EscalaService]
})
export class EscalaModule {}
