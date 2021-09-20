import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { JobPostDto } from './jobs.entity';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(
      private jobsService: JobsService,
  ) {}

  @Get('')
  getJobPostings(): Promise<JobPostDto[]> {
      return this.jobsService.fetchJobPosts();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @Post('create-posting')
  createJob(@Body() job: JobPostDto): Promise<JobPostDto> {
      return this.jobsService.createJobPost(job);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @Delete('delete/:id')
  deleteJobPosting(@Param('job_id') id: string): Promise<any> {
      return this.jobsService.deleteJobPost(id);
  }
}
