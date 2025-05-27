import { HttpStatus, INestApplication } from '@nestjs/common';
import { BlogsTestManager } from './blogs-test-manager';
import { CreatePostDto } from '../../src/moduls/bloggers-platform/posts/dto/posts.dto';
import { PostsViewDto } from '../../src/moduls/bloggers-platform/posts/dto/posts.view-dto';
import request from 'supertest';

export class PostsTestManager {
  constructor(
    private app: INestApplication,
    private readonly blogTestManager: BlogsTestManager,
  ) {}

  async createPost(
    createModel: CreatePostDto,
    statusCode: number = HttpStatus.CREATED,
  ): Promise<PostsViewDto> {
    const response = await request(this.app.getHttpServer())
      .post('/api/posts')
      .send(createModel)
      .expect(statusCode);
    return response.body;
  }
}
