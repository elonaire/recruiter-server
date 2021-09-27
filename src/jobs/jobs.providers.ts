import { FUNCTION_REPOSITORY, INDUSTRY_REPOSITORY, JOBS_REPOSITORY, QUALIFICATION_REPOSITORY } from "../constants";
import { FunctionM, Industry, JobPost, Qualification } from "./jobs.entity";

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
    }
  ];