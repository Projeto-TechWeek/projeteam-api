import type { Project } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';

import type { ProjectCreateData } from '../types/projectTypes';
import { isProjectCreateData } from '../types/projectTypes';
import { BadRequestError } from '../utils/errors/BadRequestError';

const prisma = new PrismaClient();

export class ProjectController {
  static readAll = async (_req: Request, res: Response) => {
    const projects = await prisma.project.findMany();

    projects.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    res.status(200).send(projects);
  };

  static create = async (req: Request<{ id: string }, Project, ProjectCreateData>, res: Response) => {
    if (!isProjectCreateData(req.body)) throw new BadRequestError('Algumas informações estão faltando');

    const project = await prisma.project.create({
      data: req.body,
    });

    res.status(201).json(project);
  };
}
