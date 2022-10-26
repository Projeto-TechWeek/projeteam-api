import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const projectsRouter = Router();

projectsRouter.get('/', async (_request, _response) => {
  try {
    const projects = await prisma.project.findMany();

    projects.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    _response.send(projects);
  } catch (err) {
    _response.status(500).send({ message: 'Ocorreu um erro ao listar projetos' });
  }
});

projectsRouter.post('/', (_request, _response) => {
});

projectsRouter.get('/:id', (_request, _response) => {});

projectsRouter.patch('/:id', (_request, _response) => {});

export { projectsRouter };
