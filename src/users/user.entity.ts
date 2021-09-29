import { Table, Column, Model, ForeignKey, BelongsToMany, IsEmail, AllowNull, HasMany, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPost } from 'src/blog/blog.entity';
import { File } from 'src/file-upload/file.entity';
import { Industry } from 'src/jobs/jobs.entity';

@Table
export class User extends Model<User> {
  @AllowNull(false)
  @Column
  username: string;

  @Column({primaryKey: true})
  user_id: string;

  @AllowNull(false)
  @Column
  first_name: string;

  @Column
  middle_name: string;

  @AllowNull(false)
  @Column
  last_name: string;

  @AllowNull(false)
  @Column
  dob: string;

  @AllowNull(false)
  @Column
  phone: string;

  @AllowNull(false)
  @IsEmail
  @Column
  email: string;

  @AllowNull(false)
  @Column
  gender: string;

  @AllowNull(true)
  @Column
  nationality: string;

  @AllowNull(false)
  @Column
  country_code: string;

  @AllowNull(true)
  @Column
  years_of_experience: string;

  @AllowNull(true)
  @Column
  position_in_company: string;

  @AllowNull(true)
  @Column
  availability: string;

  @AllowNull(false)
  @Column
  password: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasMany(() => BlogPost)
  blogPosts: BlogPost[];

  @HasMany(() => File)
  userFiles: File[];

}

@Table
export class Company extends Model<Company> {
  @AllowNull(false)
  @Column
  name: string;

  @Column({primaryKey: true})
  company_id: string;

  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  phone: string;

  @AllowNull(false)
  @Column
  address: string;

  @AllowNull(false)
  @Column
  country_code: string;

  @AllowNull(false)
  @Column
  website: string;

  @AllowNull(false)
  @Column
  company_size: string;

  @AllowNull(false)
  @Column
  company_type: string;

  @AllowNull(false)
  @Column
  heard_about: string;

  @ForeignKey(() => Industry)
  @Column
  industry_id: string;

  @ForeignKey(() => User)
  @Column
  user_id: string;

  @BelongsTo(() => Industry)
  industry: Industry;

  @BelongsTo(() => User)
  user: User;
}

@Table
export class Role extends Model<Role> {

  @Column({primaryKey: true})
  role_id: string;

  @AllowNull(false)
  @Column
  @ApiProperty()
  role: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];

}

@Table
export class UserRole extends Model<UserRole> {

  @ForeignKey(() => User)
  @Column
  user_id: string;

  @ForeignKey(() => Role)
  @Column
  role_id: string;

  @AllowNull(false)
  @Column
  isPrimary: boolean;

}

export class UserResponse {
  @ApiProperty()
  username: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  middle_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  dob: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  nationality?: string;

  @ApiProperty()
  country_code?: string;

  @ApiProperty()
  years_of_experience?: string;

  @ApiProperty()
  position_in_company?: string;

  @ApiProperty()
  availability?: string;
}

export class UserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  middle_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  dob: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  nationality?: string;

  @ApiProperty()
  country_code?: string;

  @ApiProperty()
  years_of_experience?: string;

  @ApiProperty()
  position_in_company?: string;

  @ApiProperty()
  availability?: string;

  @ApiProperty()
  password: string;
}

export class UserUpdateDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  middle_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  dob: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  nationality?: string;

  @ApiProperty()
  country_code?: string;

  @ApiProperty()
  years_of_experience?: string;

  @ApiProperty()
  position_in_company?: string;

  @ApiProperty()
  availability?: string;

  @ApiProperty()
  password: string;
}

export class UserRoleDto {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  role: string;
}

export class RoleDto {
  @ApiProperty()
  role: string;
}