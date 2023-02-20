import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from './core/health/health.module';
import configuration from './config/configuration';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BullModule } from '@nestjs/bull';
import { AuthenticationModule } from './core/authentication/authentication.module';
import { FeedModule } from './core/feed/feed.module';
import { UsersModule } from './core/users/users.module';
import { ConnectionEntity, PostEntity, PublicFileEntity, UserEntity } from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('queue.host'),
          port: +configService.get<string>('queue.port'),
          username: configService.get<string>('queue.username'),
          password: configService.get<string>('queue.password')
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        synchronize: true,
        keepConnectionAlive: true,
        ssl: {
          ca: configService.get<string>('database.certificateAuthority'),
          rejectUnauthorized: false,
        },
        entities: [UserEntity, PostEntity, PublicFileEntity, ConnectionEntity],
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: configService.get<string>('smtp.transport'),
        defaults: {
          from: '"minibook" <no-reply@minibook.io>',
        },
        template: {
          dir: process.cwd() + '/template/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    AuthenticationModule,
    UsersModule,
    FeedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

