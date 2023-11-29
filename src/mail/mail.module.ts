import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './service/mail.service';
import { ConfigModule } from '@nestjs/config';
import { UserInfoService } from 'src/user-info/service/user-info.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInfoSchema } from 'src/user-info/user-info.model';

@Module({
  imports:[ConfigModule.forRoot(),
    MongooseModule.forFeature([{name: "UserInfo", schema:UserInfoSchema}])],
  controllers: [MailController],
  providers:[MailService, UserInfoService]
})
export class MailModule {}
