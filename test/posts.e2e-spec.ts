import { INestApplication } from '@nestjs/common';
import { BlogsTestManager } from './helpers/blogs-test-manager';
import { PostsTestManager } from './helpers/posts-test-manager';
import { initSettings } from './helpers/init-settings';
import { JwtService } from '@nestjs/jwt';
import { deleteAllData } from './helpers/delete-all-data';
import { CreateBlogDto } from '../src/moduls/bloggers-platform/blogs/dto/create-blog.dto';
import { CreatePostDto } from '../src/moduls/bloggers-platform/posts/dto/posts.dto';

describe('posts', () => {
  let app: INestApplication;
  let blogTestManager: BlogsTestManager;
  let postTestManager: PostsTestManager;
  beforeAll(async () => {
    const result = await initSettings((moduleBuilder) => {
      moduleBuilder.overrideProvider(JwtService).useValue(
        new JwtService({
          secret: 'access-token-secret',
          signOptions: { expiresIn: '2s' },
        }),
      );
    });

    app = result.app;
    blogTestManager = result.blogTestManager;
    postTestManager = result.postTestManager;
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await deleteAllData(app);
  });

  it('should create new post', async () => {
    //создаем блог, blogId которого будем использовать
    const blogBody: CreateBlogDto = {
      name: 'string',
      description: 'string',
      websiteUrl:
        'https://p.7H1rV.DE-7hHrXZ9-ecNVheetttF66YKCJ_-gjJz1zDp0fQ6Yk1RCgUP00kPHQQ-ZuYOna0386PCmCt6VFpYShwgjX',
    };
    const createdBlog = await blogTestManager.createBlog(blogBody);
    // создаем пост с привязкой к блогу
    const postBody: CreatePostDto = {
      title: 'string',
      shortDescription: 'string',
      content: 'string',
      blogId: createdBlog.id,
    };
    const createdPost = await postTestManager.createPost(postBody);
    // проверяем, что пост создался
    expect(createdPost).toBeDefined();
    expect(createdPost.title).toBe(postBody.title);
    expect(createdPost.shortDescription).toBe(postBody.shortDescription);
    expect(createdPost.content).toBe(postBody.content);
    expect(createdPost.blogId).toBe(createdBlog.id);
  });
});
