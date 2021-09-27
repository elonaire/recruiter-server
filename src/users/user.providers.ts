import { USERS_REPOSITORY, ROLES_REPOSITORY, USER_ROLES_REPOSITORY, COMPANY_REPOSITORY } from '../constants';
import { Company, Role, User, UserRole } from './user.entity';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: User,
  },
  {
    provide: ROLES_REPOSITORY,
    useValue: Role,
  },
  {
    provide: USER_ROLES_REPOSITORY,
    useValue: UserRole,
  },
  {
    provide: COMPANY_REPOSITORY,
    useValue: Company,
  },
];