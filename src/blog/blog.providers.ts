import { BLOG_REPOSITORY } from '../constants';
import { BlogPost } from './blog.entity';

export const blogProviders = [
    {
        provide: BLOG_REPOSITORY,
        useValue: BlogPost,
      },
];