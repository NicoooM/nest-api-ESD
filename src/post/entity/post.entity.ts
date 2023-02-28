import { CategoryEntity } from 'src/category/entities/category.entity';
import { Timestamp } from 'src/Generic/timestamp.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('post')
export class PostEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    default: false,
  })
  published: boolean;

  @ManyToMany(() => CategoryEntity, (category) => category.posts, {
    cascade: ['insert'],
  })
  @JoinTable()
  categories: CategoryEntity[];

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
