import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecursosColSchema } from './recursos-col.model';
import { RecursosColController } from './recursos-col.controller';
import { RecursosColService } from './service/recursos-col.service';

@Module({
 imports: [MongooseModule.forFeature([{name:'RecursosCol', schema: RecursosColSchema}])],
 controllers: [RecursosColController],
 providers:[RecursosColService]


})
export class RecursosColModule {}
