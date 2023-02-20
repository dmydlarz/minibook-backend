import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as argon2 from 'argon2';

import { ApiProperty } from '@nestjs/swagger';
import { PublicFileEntity } from 'src/entities/public-file.entity';
import { PostEntity } from './post.entity';
import { ConnectionEntity } from './connection-entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id?: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @ApiProperty()
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
  })
  @ApiProperty()
  displayname: string;

  @OneToMany(() => PostEntity, (post) => post.author)
  feedPosts: PostEntity[]

  @Column({ default: true })
  isPublished: boolean;

  // @OneToOne(type => ProfileEntity, profile => profile.user)
  // profile: ProfileEntity;

  // @OneToMany(type => PhotoEntity, photo => photo.user)
  // photos: PhotoEntity[];

  // @OneToMany(type => FriendEntity, friend => friend.user)
  // friends: FriendEntity[];

  // @OneToMany(
  //   (type) => NewsPostEntity,
  //   (newsPostEntity) => newsPostEntity.author,
  // )
  // newsposts: NewsPostEntity[];

  @JoinColumn()
  @OneToOne(() => PublicFileEntity, { eager: true, nullable: true })
  public avatar?: PublicFileEntity;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  firstname: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lastname: string;

  @OneToMany(() => ConnectionEntity, (connection) => connection.following)
  following: ConnectionEntity[];

  @OneToMany(() => ConnectionEntity, (connection) => connection.followers)
  followers: ConnectionEntity[];

  @Column({ default: 'none' })
  gender: string

  @Column({ default: 'none' })
  location: string

  @Column({ default: 'none' })
  phonenumber: string

  @Column({ default: 'none' })
  country: string

  @Column({ default: 'none' })
  birthday: string

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  // @OneToOne(type => Settings, settings => settings.user)
  // settings: Settings;

  // @OneToMany(type => NotificationEntity, notification => notification.user)
  // notifications: NotificationEntity[]

  @BeforeInsert()
  private async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  getAvatarUrl(): string {
    return this.avatar ? this.avatar.url : 'http://default'
  }

}
