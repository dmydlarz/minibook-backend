import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { UserRequest } from 'src/common/decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/guard/jwt-auth.guard';
import { PostEntity } from '../../entities/post.entity';

@Controller('feed')
@ApiBearerAuth()
export class FeedController {
  constructor(private readonly feedService: FeedService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@UserRequest() user, @Body() createFeedDto: CreateFeedDto) {
    return this.feedService.create(user, createFeedDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@UserRequest() user): Promise<PostEntity[]> {
    console.log(`User Feed: ${JSON.stringify(user)}`)
    const _feed = await this.feedService.findAll(+user.id);
    console.log(_feed);
    console.log(JSON.stringify(_feed));
    return _feed;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.feedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedDto: UpdateFeedDto) {
    return this.feedService.update(+id, updateFeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedService.remove(+id);
  }
}
