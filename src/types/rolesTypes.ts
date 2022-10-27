import { Prisma } from '@prisma/client';

import { areParametersDefined } from '../utils/areParametersUndefined';

import type { ExcludeOptionals } from './utilities';

// Validators
export const roleCreateDataValidator = Prisma.validator<Prisma.RoleArgs>()({
  select: {
    name: true,
    description: true,
    vacancies: true,
    projectId: true,
  },
});

// Types
export type RoleCreateData = Prisma.RoleGetPayload<typeof roleCreateDataValidator>;

// Type Guards
export const isRoleCreateData = (obj: ExcludeOptionals<RoleCreateData>): obj is RoleCreateData => {
  const { name, description, vacancies, projectId } = obj;

  return areParametersDefined(name, description, vacancies, projectId);
};
