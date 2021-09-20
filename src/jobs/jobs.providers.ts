import { JOBS_REPOSITORY } from "../constants";
import { JobPost } from "./jobs.entity";

export const jobProviders = [
    {
      provide: JOBS_REPOSITORY,
      useValue: JobPost,
    },
  ];