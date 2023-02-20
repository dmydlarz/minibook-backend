import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'connections' })
export class ConnectionEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => UserEntity,
        (user) => user.followers)
    @JoinColumn({ name: 'followers_id' })
    followers: UserEntity

    @ManyToOne(() => UserEntity,
        (user) => user.following)
    @JoinColumn({ name: 'following_id' })
    following: UserEntity
}