import { CreateCategoryDto } from 'src/category/dto/create-category.dto';

export class UpdatePostDto {
  title?: string;
  description?: string;
  published?: boolean;
  categories?: CreateCategoryDto[];
}
