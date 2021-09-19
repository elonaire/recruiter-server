import { Controller, Get, Post } from '@nestjs/common';
import { BlogPostDto } from './blog.entity';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
    constructor(
        private readonly blogService: BlogService,
    ) { }

    @Get('')
    fetchBlogPosts(): Promise<BlogPostDto[]> {
        return this.blogService.fetchBlogPosts();
    }

    @Post('')
    createBlogPost(blogPostDto: BlogPostDto): Promise<BlogPostDto> {
        return this.blogService.createBlogPost(blogPostDto);
    }
}
