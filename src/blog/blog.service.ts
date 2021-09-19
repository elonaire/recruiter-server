import { Inject, Injectable } from '@nestjs/common';
import { BLOG_REPOSITORY } from '../constants';
import { BlogPost, BlogPostDto } from './blog.entity';

@Injectable()
export class BlogService {
    constructor(
        @Inject(BLOG_REPOSITORY) private blogRepository: typeof BlogPost,
    ) {}

    async fetchBlogPosts(): Promise<BlogPost[]> {
        return this.blogRepository.findAll<BlogPost>();
    }

    async createBlogPost(post: BlogPostDto): Promise<BlogPost> {
        return this.blogRepository.create(post);
    }
}
