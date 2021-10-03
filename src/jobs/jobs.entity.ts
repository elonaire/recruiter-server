import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, AllowNull, Model, BelongsToMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/user.entity';

@Table
export class JobPost extends Model<JobPost> {
  @Column({ primaryKey: true })
  job_id: string;

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column
  type: string;

  @AllowNull(false)
  @Column
  experience: string;

  @AllowNull(false)
  @Column
  salary_currency: string;

  @AllowNull(false)
  @Column
  job_level: string;

  @AllowNull(false)
  @Column
  monthly_salary: string;

  @AllowNull(false)
  @Column
  openings: number;

  @AllowNull(false)
  @Column
  description: string;

  @ForeignKey(() => User)
  @Column
  user_id: string;

  @BelongsTo(() => User)
  user: User;
}

@Table
export class Qualification extends Model<Qualification> {
  @Column({ primaryKey: true })
  qualification_id: string;

  @AllowNull(false)
  @Column
  name: string;

  @BelongsToMany(() => JobPost, () => JobPostQualification)
  jobPosts: JobPost[];
}

@Table
export class FunctionM extends Model<FunctionM> {
  @Column({ primaryKey: true })
  function_id: string;

  @AllowNull(false)
  @Column
  name: string;

  @BelongsToMany(() => JobPost, () => JobPostFunction)
  jobPosts: JobPost[];
}

@Table
export class Industry extends Model<Industry> {
  @Column({ primaryKey: true })
  industry_id: string;

  @AllowNull(false)
  @Column
  name: string;

  @BelongsToMany(() => JobPost, () => JobPostIndustry)
  jobPosts: JobPost[];
}

@Table
export class Location extends Model<Location> {
  @Column({ primaryKey: true })
  location_id: string;

  @AllowNull(false)
  @Column
  name: string;

  @BelongsToMany(() => JobPost, () => JobPostLocation)
  jobPosts: JobPost[];
}

@Table
export class JobPostLocation extends Model<JobPostLocation> {
  @ForeignKey(() => JobPost)
  @Column
  job_id: string;

  @ForeignKey(() => Location)
  @Column
  location_id: string;
}

@Table
export class JobPostIndustry extends Model<JobPostIndustry> {
  @ForeignKey(() => JobPost)
  @Column
  job_id: string;

  @ForeignKey(() => Industry)
  @Column
  industry_id: string;
}

@Table
export class JobPostFunction extends Model<JobPostFunction> {
  @ForeignKey(() => JobPost)
  @Column
  job_id: string;

  @ForeignKey(() => FunctionM)
  @Column
  function_id: string;
}

@Table
export class JobPostQualification extends Model<JobPostQualification> {
  @ForeignKey(() => Qualification)
  @Column
  qualification_id: string;

  @ForeignKey(() => JobPost)
  @Column
  job_id: string;
}

export class JobPostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  experience: string;

  @ApiProperty()
  salary_currency: string;

  @ApiProperty()
  job_level: string;

  @ApiProperty()
  monthly_salary: string;

  @ApiProperty()
  openings: number;

  @ApiProperty()
  description: string;
}

export class QualificationDto {
  @ApiProperty()
  name: string;
}

export class FunctionDto {
  @ApiProperty()
  name: string;
}

export class IndustryDto {
  @ApiProperty()
  name: string;
}

export class LocationDto {
  @ApiProperty()
  name: string;
}
