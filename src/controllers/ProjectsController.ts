import type { Project } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';

import { isProjectWithRolesCreateData, ProjectCreateData, ProjectWithRolesCreateData } from '../types/projectTypes';
import { RequestWithoutParams } from '../types/routesTypes';
import { BadRequestError } from '../utils/errors/BadRequestError';
import { UnauthorizedError } from '../utils/errors/UnauthorizedError';

const prisma = new PrismaClient();

export class ProjectController {
  static readAll = async (_req: Request, res: Response) => {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        area: true,
        createdAt: true,
        Role: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(projects);
  };

  static create = async (req: RequestWithoutParams<Project, ProjectWithRolesCreateData>, res: Response) => {
    const userId = req.headers.userid as string;
    if (!userId) throw new BadRequestError('Id de usuário não informado');

    if (!isProjectWithRolesCreateData(req.body)) throw new BadRequestError('Algumas informações estão faltando');
    const { title, methodology, description, area, Role } = req.body;

    const project = await prisma.project.create({
      data: { title, methodology, description, area },
    });

    const roles = await Promise.all(
      Role.map(async (role) => {
        return await prisma.role.create({
          data: {
            projectId: project.id,
            name: role.name,
            description: role.description,
            vacancies: role.vacancies,
          },
        });
      }),
    );

    const roleOwner = await prisma.role.create({
      data: {
        projectId: project.id,
        name: 'Organizador',
        description: 'Dono do projeto.',
        vacancies: 1,
      },
    });

    const userOwner = await prisma.user_Project.create({
      data: {
        userId: userId,
        projectId: project.id,
        roleId: roleOwner.id,
        tierId: 1,
      },
    });

    return res.status(201).json({ project, roles, userOwner });
  };

  static read = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) throw new BadRequestError('O id do projeto não foi fornecido');

    const project = await prisma.project.findUniqueOrThrow({
      include: {
        Role: true,
        User_Project: true,
      },
      where: {
        id: id,
      },
    });

    return res.status(200).json(project);
  };

  static patch = async (req: Request<{ id: string }, Project, ProjectCreateData>, res: Response) => {
    const { id } = req.params;
    if (!id) throw new BadRequestError('O id do projeto não foi fornecido');

    const userId = req.headers.userid as string;
    if (!userId) throw new BadRequestError('Id de usuário não informado');

    if (!req.body) throw new BadRequestError('Nenhum dado foi informado');
    const { title, methodology, description, area } = req.body;

    const userProject = await prisma.user_Project.findUniqueOrThrow({
      where: {
        userId_projectId: { userId, projectId: id },
      },
    });

    if (userProject.tierId > 2) throw new UnauthorizedError('Usuário sem permissão para realizar esta ação');

    const project = await prisma.project.update({
      where: {
        id: id,
      },
      data: {
        title,
        methodology,
        description,
        area,
      },
    });

    return res.status(200).json(project);
  };

  static delete = async (req: Request<{ id: string }, Project, ProjectCreateData>, res: Response) => {
    const { id } = req.params;
    if (!id) throw new BadRequestError('O id do projeto não foi fornecido');

    const userId = req.headers.userid as string;
    if (!userId) throw new BadRequestError('Id de usuário não informado');

    const userProject = await prisma.user_Project.findUniqueOrThrow({
      where: {
        userId_projectId: { userId, projectId: id },
      },
    });

    if (userProject.tierId > 2) throw new UnauthorizedError('Usuário sem permissão para realizar esta ação');

    const deleteUserProject = await prisma.user_Project.delete({
      where: {
        userId_projectId: { userId, projectId: id },
      },
    });

    const deleteRoles = await prisma.role.deleteMany({
      where: {
        projectId: id,
      },
    });

    const deleteUserOwner = await prisma.user_Project.deleteMany({
      where: {
        projectId: id,
      },
    });

    const deleteProject = await prisma.project.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({ deleteProject, deleteRoles, deleteUserOwner, deleteUserProject });
  };
}
