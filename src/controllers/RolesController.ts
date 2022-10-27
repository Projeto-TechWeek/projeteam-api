import type { Role } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';

import { RoleCreateData, isRoleCreateData } from '../types/rolesTypes';
import { RequestWithoutParams } from '../types/routesTypes';
import { BadRequestError } from '../utils/errors/BadRequestError';
import { UnauthorizedError } from '../utils/errors/UnauthorizedError';

const prisma = new PrismaClient();

export class RolesController {
  static create = async (req: RequestWithoutParams<Role, RoleCreateData>, res: Response) => {
    const userId = req.headers.userid as string;
    if (!userId) throw new BadRequestError('Id de usuário não informado');

    if (!isRoleCreateData(req.body)) throw new BadRequestError('Algumas informações estão faltando');
    const { name, description, vacancies, projectId } = req.body;

    const role = await prisma.role.create({
      data: {
        name: name,
        description: description,
        vacancies: vacancies,
        projectId: projectId,
      },
    });

    return res.status(201).json(role);
  };

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

    return res.status(200).json(deleteRole);
  };

  static patch = async (req: Request<{ id: string }, Role, RoleCreateData>, res: Response) => {
    const { id } = req.params;
    if (!id) throw new BadRequestError('O id do projeto não foi fornecido');

    const userId = req.headers.userid as string;
    if (!userId) throw new BadRequestError('Id de usuário não informado');

    if (!req.body) throw new BadRequestError('Nenhum dado foi informado');
    const { name, description, vacancies } = req.body;

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

    const updateRole = await prisma.role.update({
      where: {
        id: id
      },
      data:{
        name,
        description,
        vacancies
      }
    })

    return res.status(200).json(updateRole)
  };
}
