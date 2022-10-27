import { Prisma } from '@prisma/client';

import { areParametersDefined } from '../utils/areParametersUndefined';

import type { ExcludeOptionals } from './utilities';

// Validators
export const projectCreateDataValidator = Prisma.validator<Prisma.ProjectArgs>()({
  select: {
    title: true,
    description: true,
    methodology: true,
    area: true,
  },
});

export const projectWithRolesCreateDataValidator = Prisma.validator<Prisma.ProjectArgs>()({
  select: {
    title: true,
    description: true,
    methodology: true,
    area: true,
  },
  include: {
    Role: true,
  },
});

// Types
export type ProjectCreateData = Prisma.ProjectGetPayload<typeof projectCreateDataValidator>;
export type ProjectWithRolesCreateData = Prisma.ProjectGetPayload<typeof projectWithRolesCreateDataValidator>;

// Type Guards
export const isProjectCreateData = (obj: ExcludeOptionals<ProjectCreateData>): obj is ProjectCreateData => {
  const { title, description, area, methodology } = obj;

  return areParametersDefined(title, description, area, methodology);
};

export const isProjectWithRolesCreateData = (
  obj: ExcludeOptionals<ProjectWithRolesCreateData>,
): obj is ProjectWithRolesCreateData => {
  const { title, description, area, methodology } = obj;
  const { name, vacancies } = obj.Role[0];
  const descriptionRole = obj.Role[0].description;

  return areParametersDefined(title, description, area, methodology, name, vacancies, descriptionRole);
};
