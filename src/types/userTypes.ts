import { Prisma } from '@prisma/client';

import { areParametersDefined } from '../utils/areParametersUndefined';

import type { ExcludeOptionals } from './utilities';

// Validators
export const userCreateDataValidator = Prisma.validator<Prisma.UserArgs>()({
  select: { id: true, name: true, email: true, phone: true, avatar: true },
});

export const userProfileDataValidator = Prisma.validator<Prisma.UserArgs>()({
  select: { name: true, email: true, phone: true, avatar: true },
});

// Types
export type UserCreateData = Prisma.UserGetPayload<typeof userCreateDataValidator>;
export type UserProfileData = Prisma.UserGetPayload<typeof userProfileDataValidator>;

// Type Guards
export const isUserCreateData = (obj: ExcludeOptionals<UserCreateData>): obj is UserCreateData => {
  const { id, name, email, phone } = obj;

  return areParametersDefined(id, name, phone, email);
};
