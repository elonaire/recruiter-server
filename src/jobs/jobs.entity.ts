import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, AllowNull, Model } from 'sequelize-typescript';

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
  profession: string;
}

export class JobPostDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  profession: string;
}
