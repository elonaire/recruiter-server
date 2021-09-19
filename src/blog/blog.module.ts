import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { blogProviders } from './blog.providers';
import { BlogService } from './blog.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService, ...blogProviders]
})
export class BlogModule {}
