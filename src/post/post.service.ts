import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './entity/create-post.dto';
import { PostEntity } from './entity/post.entity';
import { UpdatePostDto } from './entity/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async getAllPosts(queries: any) {
    const { categories } = queries;
    let categoryList = [];
    if (categories && categories !== '') {
      categoryList = categories.split(',');
    }

    const postsList = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.categories', 'categories')
      .leftJoinAndSelect('post.comments', 'comments')
      .select([
        'post',
        'comments',
        'categories',
        'user.firstname',
        'user.lastname',
      ])
      .orderBy('comments.createdAt', 'DESC')
      .orderBy('post.createdAt', 'DESC');

    if (categoryList.length > 0) {
      postsList.where('categories.name IN (:...categoryList)', {
        categoryList,
      });
    }

    return postsList.getMany();
  }

  async getPostById(id: number) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.categories', 'categories')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.comments', 'comments')
      .select([
        'post',
        'comments',
        'categories',
        'user.firstname',
        'user.lastname',
      ])
      .orderBy('comments.createdAt', 'DESC')
      .where('post.id = :id', { id })
      .getOne();
    return post;
  }

  async createPost(post: CreatePostDto) {
    try {
      return await this.postRepository.save(post);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updatePost(id: number, data: UpdatePostDto) {
    try {
      const post = await this.postRepository.findOneBy({ id });
      if (!post) {
        throw new Error('Post not found');
      }
      return await this.postRepository.update(id, data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async softDeletePost(id: number) {
    try {
      const post = await this.postRepository.findOneBy({ id });
      if (!post) {
        throw new Error('Post not found');
      }

      return await this.postRepository.softDelete(id);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
