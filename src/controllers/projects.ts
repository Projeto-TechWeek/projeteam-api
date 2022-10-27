import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import { BadRequestError } from '../utils/errors/BadRequestError';
import { ApiError } from '../utils/errors/ApiError';
const prisma = new PrismaClient();

const projectsRouter = Router();

projectsRouter.get('/', async (_request, response) => {
  const projects = await prisma.project.findMany();

  projects.sort((a, b) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  response.status(200).send(projects);
});

projectsRouter.post('/', async (request, response) => {
  const { title, description, methodology, area } = request.body;

  if (!title || !description || !methodology || !area) {
    throw new BadRequestError('É preciso preencher todos os campos');
  }
  try {
    const project = await prisma.project.create({ data: { title, description, methodology, area } });
    response.status(201).send(project);
  } catch (err) {
    throw new ApiError('Ocorreu um erro ao criar o projeto');
  }
});

projectsRouter.get('/:id', (_request, _response) => {});

projectsRouter.patch('/:id', (_request, _response) => {});

export { projectsRouter };
