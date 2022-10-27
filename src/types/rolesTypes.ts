import { Prisma } from '@prisma/client';

// Validators
export const roleCreateDataValidator = Prisma.validator<Prisma.RoleArgs>()({
  select: {
    name: true,
    description: true,
    vacancies: true,
  },
});

// Types
export type RoleCreateData = Prisma.RoleGetPayload<typeof roleCreateDataValidator>;
