import { FUNCTION_REPOSITORY, INDUSTRY_REPOSITORY, JOBS_REPOSITORY, JOB_FUNCTION_REPOSITORY, JOB_INDUSTRY_REPOSITORY, JOB_LOCATION_REPOSITORY, JOB_QUALIFICATION_REPOSITORY, LOCATION_REPOSITORY, QUALIFICATION_REPOSITORY } from "../constants";
import { FunctionM, Industry, JobPost, JobPostFunction, JobPostIndustry, JobPostLocation, JobPostQualification, Location, Qualification } from "./jobs.entity";

export const jobProviders = [
    {
      provide: JOBS_REPOSITORY,
      useValue: JobPost,
    },
    {
      provide: QUALIFICATION_REPOSITORY,
      useValue: Qualification,
    },
    {
      provide: FUNCTION_REPOSITORY,
      useValue: FunctionM,
    },
    {
      provide: INDUSTRY_REPOSITORY,
      useValue: Industry,
    },
    {
      provide: JOB_QUALIFICATION_REPOSITORY,
      useValue: JobPostQualification,
    },
    {
      provide: JOB_FUNCTION_REPOSITORY,
      useValue: JobPostFunction,
    },
    {
      provide: JOB_INDUSTRY_REPOSITORY,
      useValue: JobPostIndustry,
    },
    {
      provide: LOCATION_REPOSITORY,
      useValue: Location,
    },
    {
      provide: JOB_LOCATION_REPOSITORY,
      useValue: JobPostLocation,
    }
  ];