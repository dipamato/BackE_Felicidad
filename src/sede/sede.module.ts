import { Module } from '@nestjs/common';
import { SedeController } from './sede.controller';
import { SedeService } from './service/sede.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SedeSchema } from './sede.model';

@Module({
    imports:[MongooseModule.forFeature([{name:'Sede', schema: SedeSchema}])],
    controllers: [SedeController],
    providers: [SedeService]
})
export class SedeModule {
  
}
