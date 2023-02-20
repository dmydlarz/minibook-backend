import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { PostEntity } from '../../entities/post.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class FeedService {

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) { }

  async create(user: UserEntity, createFeedDto: CreateFeedDto) {
    createFeedDto.author = user;
    return await this.postRepository.save(createFeedDto);
  }

  async findAll(id: number): Promise<PostEntity[]> {
    return await this.postRepository.find({
      where: {
        author: id
      }
    })
    return await this.postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.author', 'author')
      .orderBy('post.createdAt', 'DESC')
      .take(10).skip(0).getMany()
  }

  async findOne(id: number): Promise<PostEntity> {
    return await this.postRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateFeedDto: UpdateFeedDto) {
    return await this.postRepository.update(id, updateFeedDto);
  }

  async remove(id: number) {
    return this.postRepository.delete(id)
  }
}
