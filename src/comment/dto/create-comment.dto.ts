import { PostEntity } from 'src/post/entity/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class CreateCommentDto {
  body: string;
  post: PostEntity;
  user: UserEntity;
}
