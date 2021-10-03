import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  FUNCTION_REPOSITORY,
  INDUSTRY_REPOSITORY,
  JOBS_REPOSITORY,
  JOB_FUNCTION_REPOSITORY,
  JOB_INDUSTRY_REPOSITORY,
  JOB_LOCATION_REPOSITORY,
  JOB_QUALIFICATION_REPOSITORY,
  LOCATION_REPOSITORY,
  QUALIFICATION_REPOSITORY,
} from '../constants';
import {
  FunctionDto,
  FunctionM,
  Industry,
  IndustryDto,
  JobPost,
  JobPostDto,
  JobPostFunction,
  JobPostIndustry,
  JobPostLocation,
  JobPostQualification,
  Location,
  LocationDto,
  Qualification,
  QualificationDto,
} from './jobs.entity';
import { v4 as uuidGenerator } from 'uuid';
import { Op } from 'sequelize';

@Injectable()
export class JobsService {
  constructor(
    @Inject(JOBS_REPOSITORY) private readonly jobsRepository: typeof JobPost,
    @Inject(QUALIFICATION_REPOSITORY)
    private readonly qualificationsRepository: typeof Qualification,
    @Inject(FUNCTION_REPOSITORY)
    private readonly functionsRepository: typeof FunctionM,
    @Inject(INDUSTRY_REPOSITORY)
    private readonly industriesRepository: typeof Industry,
    @Inject(LOCATION_REPOSITORY)
    private readonly locationsRepository: typeof Location,
    @Inject(JOB_QUALIFICATION_REPOSITORY)
    private readonly jobQualificationRepository: typeof JobPostQualification,
    @Inject(JOB_LOCATION_REPOSITORY)
    private readonly jobLocationRepository: typeof JobPostLocation,
    @Inject(JOB_FUNCTION_REPOSITORY)
    private readonly jobFunctionRepository: typeof JobPostFunction,
    @Inject(JOB_INDUSTRY_REPOSITORY)
    private readonly jobIndustryRepository: typeof JobPostIndustry,
  ) {}

  async fetchJobPosts(...params: any[]): Promise<JobPost[]> {
    // Advanced Job search

    let jobPosts;
    let allJobPromises: any = [];
    if (params.length > 0) {
      allJobPromises = params.map(async (param) => {
        if (param.hasOwnProperty('qualification')) {
          const qualification: Qualification = await this.qualificationsRepository.findOne<
            Qualification
          >({ where: {qualification_id: param['qualification']} });
          if (!qualification) {
            throw new HttpException(
                'No job match found!',
                HttpStatus.BAD_REQUEST,
              );
          }
          return qualification.$get('jobPosts');
        } else if (param.hasOwnProperty('industry')) {
          const industry: Industry = await this.industriesRepository.findOne<
            Industry
          >({ where: {industry_id: param['industry']} });
          if (!industry) {
            throw new HttpException(
                'No job match found!',
                HttpStatus.BAD_REQUEST,
              );
          }
          return industry.$get('jobPosts');
        } else if (param.hasOwnProperty('location')) {
          const location: Location = await this.locationsRepository.findOne<
            Location
          >({ where: {location_id: param['location']} });
          if (!location) {
            throw new HttpException(
                'No job match found!',
                HttpStatus.BAD_REQUEST,
              );
          }
          return location.$get('jobPosts');
        } else if (param.hasOwnProperty('jobFunction')) {
            const jobFunction: FunctionM = await this.functionsRepository.findOne<
            FunctionM
            >({ where: {function_id: param['jobFunction']} });
            if (!jobFunction) {
                throw new HttpException(
                    'No job match found!',
                    HttpStatus.BAD_REQUEST,
                  );
              }
            return jobFunction.$get('jobPosts');
          }
      });
      jobPosts = await Promise.all(allJobPromises);
    } else {
      jobPosts = await this.jobsRepository.findAll();
    }
    // return this.jobsRepository.findAll<JobPost>();
    return jobPosts;
  }

  async createJobPost(post: JobPostDto): Promise<JobPost> {
    const job_id = uuidGenerator();
    const job: JobPost = this.jobsRepository.create({ ...post, job_id });

    if (!job) {
      throw new HttpException(
        'Job post not created!',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.jobQualificationRepository.create({job_id, qualification_id: post.qualification_id});
    await this.jobLocationRepository.create({job_id, location_id: post.location_id});
    await this.jobIndustryRepository.create({job_id, industry_id: post.industry_id});
    await this.jobFunctionRepository.create({job_id, function_id: post.function_id});

    return job;
  }

  async deleteJobPost(job_id: string): Promise<any> {
    return this.jobsRepository.destroy({
      where: { job_id },
    });
  }

  async addQualification(
    qualification: QualificationDto
  ): Promise<Qualification> {
    const qualification_id = uuidGenerator();
    return this.qualificationsRepository.create({
      ...qualification,
      qualification_id,
    });
  }

  async addFunction(jobFunction: FunctionDto): Promise<FunctionDto> {
    const function_id = uuidGenerator();
    return this.functionsRepository.create({ ...jobFunction, function_id });
  }

  async addIndustry(industry: IndustryDto): Promise<any> {
    const industry_id = uuidGenerator();
    return this.industriesRepository.create({ ...industry, industry_id });
  }

  async addLocation(location: LocationDto): Promise<LocationDto> {
    const location_id = uuidGenerator();
    return this.locationsRepository.create({ ...location, location_id });
  }

  async fetchConfigurations(
    type: string
  ): Promise<
    QualificationDto[] | LocationDto[] | IndustryDto[] | FunctionDto[]
  > {
    switch (type) {
      case 'qualifications':
        return this.qualificationsRepository.findAll<Qualification>();
      case 'locations':
        return this.locationsRepository.findAll<Location>();
      case 'industries':
        return this.industriesRepository.findAll<Industry>();
      case 'functions':
        return this.functionsRepository.findAll<FunctionM>();
    }
  }
}
