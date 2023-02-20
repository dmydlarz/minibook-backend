import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { PostEntity } from '../../entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [
    FeedController],
  providers: [FeedService],
  exports: []
})
export class FeedModule {}
