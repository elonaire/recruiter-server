import { Inject, Injectable } from '@nestjs/common';
import { FUNCTION_REPOSITORY, INDUSTRY_REPOSITORY, JOBS_REPOSITORY, LOCATION_REPOSITORY, QUALIFICATION_REPOSITORY } from '../constants';
import { FunctionDto, FunctionM, Industry, IndustryDto, JobPost, JobPostDto, JobPostLocation, LocationDto, Qualification, QualificationDto } from './jobs.entity';
import { v4 as uuidGenerator } from 'uuid';

@Injectable()
export class JobsService {
    constructor(
        @Inject(JOBS_REPOSITORY) private readonly jobsRepository: typeof JobPost,
        @Inject(QUALIFICATION_REPOSITORY) private readonly qualificationsRepository: typeof Qualification,
        @Inject(FUNCTION_REPOSITORY) private readonly functionsRepository: typeof FunctionM,
        @Inject(INDUSTRY_REPOSITORY) private readonly industriesRepository: typeof Industry,
        @Inject(LOCATION_REPOSITORY) private readonly locationsRepository: typeof JobPostLocation,
    ) { }

    async fetchJobPosts(): Promise<JobPost[]> {
        return this.jobsRepository.findAll<JobPost>();
    }

    async createJobPost(post: JobPostDto): Promise<JobPost> {
        const job_id = uuidGenerator();
        return this.jobsRepository.create({...post, job_id});
    }

    async deleteJobPost(job_id: string): Promise<any> {
        return this.jobsRepository.destroy({
            where: { job_id },
        });
    }

    async addQualification(qualification: QualificationDto): Promise<Qualification> {
        const qualification_id = uuidGenerator();
        return this.qualificationsRepository.create({...qualification, qualification_id});
    }

    async addFunction(jobFunction: FunctionDto): Promise<FunctionDto> {
        const function_id = uuidGenerator();
        return this.functionsRepository.create({...jobFunction, function_id});
    }

    async addIndustry(industry: IndustryDto): Promise<any> {
        const industry_id = uuidGenerator();
        return this.industriesRepository.create({...industry, industry_id});
    }

    async addLocation(location: LocationDto): Promise<LocationDto> {
        const location_id = uuidGenerator();
        return this.locationsRepository.create({...location, location_id});
    }
}
