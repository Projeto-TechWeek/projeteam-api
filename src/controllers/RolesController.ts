import type { Role } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';

import { RoleCreateData } from '../types/rolesTypes';
import { BadRequestError } from '../utils/errors/BadRequestError';
import { UnauthorizedError } from '../utils/errors/UnauthorizedError';

const prisma = new PrismaClient();

export class RolesController {
  static delete = async (req: Request<{ id: string }, Role, RoleCreateData>, res: Response) => {
    const { id } = req.params;
    if (!id) throw new BadRequestError('O id do cargo não foi fornecido');

    const userId = req.headers.userid as string;
    if (!userId) throw new BadRequestError('Id de usuário não informado');

    const role = await prisma.role.findFirstOrThrow({
      where: {
        id: id,
      },
    });

    const userProject = await prisma.user_Project.findUniqueOrThrow({
      where: {
        userId_projectId: { userId, projectId: role.projectId },
      },
    });

    if (userProject.tierId > 2) throw new UnauthorizedError('Usuário sem permissão para realizar esta ação');

    const deleteRole = await prisma.role.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json(deleteRole);
  };
}
