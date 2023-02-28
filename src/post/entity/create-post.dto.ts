import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { UserEntity } from 'src/user/entities/user.entity';

export class CreatePostDto {
  title: string;
  description?: string;
  published?: boolean;
  categories: CreateCategoryDto[];
  user: UserEntity;
}
