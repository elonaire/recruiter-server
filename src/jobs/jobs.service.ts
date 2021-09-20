import { Inject, Injectable } from '@nestjs/common';
import { JOBS_REPOSITORY } from '../constants';
import { JobPost, JobPostDto } from './jobs.entity';
import { v4 as uuidGenerator } from 'uuid';

@Injectable()
export class JobsService {
    constructor(
        @Inject(JOBS_REPOSITORY) private jobsRepository: typeof JobPost,
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
}
