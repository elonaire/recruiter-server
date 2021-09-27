import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, AllowNull, Model, BelongsToMany, ForeignKey } from 'sequelize-typescript';

@Table
export class JobPost extends Model<JobPost> {
  @Column({ primaryKey: true })
  job_id: string;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  type: string;

  @AllowNull(false)
  @Column
  location: string;
}

@Table
export class Qualification extends Model<Qualification> {
  @Column({ primaryKey: true })
  qualification_id: string;

  @AllowNull(false)
  @Column
  name: string;

  @BelongsToMany(() => JobPost, () => JobPostQualification)
  jobPostQualifications: JobPostQualification[];
}

@Table
export class FunctionM extends Model<FunctionM> {
  @Column({ primaryKey: true })
  function_id: string;

  @AllowNull(false)
  @Column
  name: string;

  @BelongsToMany(() => JobPost, () => JobPostFunction)
  jobPostFunctions: JobPostFunction[];
}

@Table
export class Industry extends Model<Industry> {
  @Column({ primaryKey: true })
  industry_id: string;

  @AllowNull(false)
  @Column
  name: string;

  @BelongsToMany(() => JobPost, () => JobPostIndustry)
  jobPostIndustries: JobPostIndustry[];
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
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  location: string;
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
