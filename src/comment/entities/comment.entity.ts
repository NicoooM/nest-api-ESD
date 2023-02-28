import { Timestamp } from 'src/Generic/timestamp.entity';
import { PostEntity } from 'src/post/entity/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('comment')
export class CommentEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  post: PostEntity;
}
