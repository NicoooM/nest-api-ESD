import { Timestamp } from 'src/Generic/timestamp.entity';
import { PostEntity } from 'src/post/entity/post.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('category')
export class CategoryEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @ManyToMany(() => PostEntity, (post) => post.categories)
  posts: PostEntity[];
}
