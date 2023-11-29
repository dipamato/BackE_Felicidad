import { Module } from '@nestjs/common';
import { UserInfoController } from './user-info.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInfoSchema } from './user-info.model';
import { UserInfoService } from './service/user-info.service';

@Module({
  imports:[MongooseModule.forFeature([{name: "UserInfo", schema:UserInfoSchema}])],
  controllers: [UserInfoController],
  providers: [UserInfoService]
})
export class UserInfoModule {}
