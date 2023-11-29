import { Module } from '@nestjs/common';
import { InstitucionEdController } from './institucion_ed.controller';
import { Institucion_EdSchema } from './institucion_ed.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Institucion_EdService } from './service/institucion_ed.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Institucion', schema: Institucion_EdSchema }]),
  ],
  controllers: [InstitucionEdController],
  providers:[Institucion_EdService]
})
export class InstitucionEdModule {}
