import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { AuthenticationModule } from '../authentication/authentication.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthenticationModule,
    TypeOrmModule.forFeature()
  ],
  providers: [ChatGateway, ChatService]
})
export class ChatModule {}
