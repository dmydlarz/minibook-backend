import { UserEntity } from '../../../entities/user.entity';

export class CreateFeedDto {
    id?: number;
    body?: string;
    createdAt?: Date;
    author?: UserEntity;
}


// export interface FeedPost {
//     id?: number;
//     body?: string;
//     createdAt?: Date;
//     author?: User;
//   }