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

// Types
export type ProjectCreateData = Prisma.ProjectGetPayload<typeof projectCreateDataValidator>;

// Type Guards
export const isProjectCreateData = (obj: ExcludeOptionals<ProjectCreateData>): obj is ProjectCreateData => {
  const { title, description, area, methodology } = obj;

  return areParametersDefined(title, description, area, methodology);
};
