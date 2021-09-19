import { Table, Column, Model, ForeignKey, BelongsToMany, IsEmail, AllowNull, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

@Table
export class BlogPost extends Model<BlogPost> {

  @Column({primaryKey: true})
  post_id: string;

  @ForeignKey(() => User)
  @Column
  user_id: string;

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column
  description: string;

  @BelongsTo(() => User)
  author: User;

}

export class BlogPostDto {
    @ApiProperty()
    title: string;
  
    @ApiProperty()
    description: string;
  }