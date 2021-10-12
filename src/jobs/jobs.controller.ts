import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import {
  FunctionDto,
  IndustryDto,
  JobApplication,
  JobApplicationDto,
  JobPost,
  JobPostDto,
  LocationDto,
  QualificationDto,
} from './jobs.entity';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get('')
  @ApiQuery({ name: 'qualification', required: false})
  @ApiQuery({ name: 'industry', required: false})
  @ApiQuery({ name: 'location', required: false})
  @ApiQuery({ name: 'function', required: false})
  getJobPostings(
    @Query('qualification') qualification?: string,
    @Query('industry') industry?: string,
    @Query('location') location?: string,
    @Query('function') jobFunction?: string,
    @Query('jobApproved') jobApproved?: string,
    @Query('jobIsFeatured') jobIsFeatured?: string,
    @Query('jobIsPopular') jobIsPopular?: string
  ): Promise<JobPost[]> {
    const args = [{ qualification }, { industry }, { location }, { jobFunction }, {jobApproved}, {jobIsFeatured}, {jobIsPopular}].filter(arg => {
        const argKeys = Object.keys(arg);
        
        if (arg[argKeys[0]]) {
          return arg;
        }
      });
    return this.jobsService.fetchJobPosts(...args);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @Post('create-posting')
  createJob(@Body() job: JobPostDto): Promise<JobPost> {
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
  addQualification(
    @Body() qualification: QualificationDto
  ): Promise<QualificationDto> {
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

//   @UseGuards(JwtAuthGuard)
//   @ApiBearerAuth('Authorization')
  @Get('fetch-configs')
  getQualification(
    @Query('type') type: string
  ): Promise<
    QualificationDto[] | LocationDto[] | IndustryDto[] | FunctionDto[]
  > {
    return this.jobsService.fetchConfigurations(type);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @Post('apply')
  apply(@Body() job: JobApplicationDto): Promise<JobApplication> {
    return this.jobsService.apply(job);
  }
}
