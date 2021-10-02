import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { FunctionDto, IndustryDto, JobPostDto, LocationDto, QualificationDto } from './jobs.entity';
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
  @Delete('delete/:job_id')
  deleteJobPosting(@Param('job_id') id: string): Promise<any> {
      return this.jobsService.deleteJobPost(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @Post('add-qualification')
  addQualification(@Body() qualification: QualificationDto): Promise<QualificationDto> {
      return this.jobsService.addQualification(qualification);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @Post('add-function')
  addFunction(@Body() jobFunction: FunctionDto): Promise<FunctionDto> {
      return this.jobsService.addFunction(jobFunction);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @Post('add-industry')
  addIndustry(@Body() industry: IndustryDto): Promise<IndustryDto> {
      return this.jobsService.addIndustry(industry);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @Post('add-location')
  addLocation(@Body() location: LocationDto): Promise<LocationDto> {
      return this.jobsService.addLocation(location);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @Get('fetch-configs')
  getQualification(@Query('type') type: string): Promise<QualificationDto[] | LocationDto[] | IndustryDto[] | FunctionDto[]> {
      return this.jobsService.fetchConfigurations(type);
  }
}
