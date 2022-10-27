import type { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';

import type { RequestWithoutParams } from '../types/routesTypes';
import type { UserCreateData, UserProfileData } from '../types/userTypes';
import { isUserCreateData } from '../types/userTypes';
import { BadRequestError } from '../utils/errors/BadRequestError';
import { NotFoundError } from '../utils/errors/NotFoundError';

const prisma = new PrismaClient();

export class UserController {
  static create = async (req: RequestWithoutParams<User, UserCreateData>, res: Response) => {
    if (!isUserCreateData(req.body)) throw new BadRequestError('Algumas informações estão faltando!');

    const { id, name, email, phone, avatar } = req.body;

    const user = await prisma.user.create({
      data: {
        id,
        name,
        email,
        phone,
        avatar,
      },
    });

    return res.status(201).json(user);
  };

  static login = async (
    req: RequestWithoutParams<User, UserCreateData /* Using this type, because of the 'return create()' possibility */>,
    res: Response,
  ) => {
    const { id } = req.body;
    if (!id) throw new BadRequestError('O id do usuário não foi fornecido');

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return this.create(req, res);
    }

    return res.status(200).json({
      user,
    });
  };

  static read = async (req: Request<{ id: string }, User, null>, res: Response) => {
    const { id } = req.params;
    if (!id) throw new BadRequestError('O id do usuário não foi fornecido');

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundError('Usuário não encontrado');

    return res.status(200).json(user);
  };

  static update = async (req: Request<{ id: string }, User, UserProfileData>, res: Response) => {
    const { id } = req.params;
    if (!id) throw new BadRequestError('O id do usuário não foi fornecido');

    if (!req.body) throw new BadRequestError('Nenhum dado foi informado');
    const { name, email, phone, avatar } = req.body;

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phone,
        avatar,
      },
    });

    if (!user) throw new NotFoundError('Usuário não encontrado');

    return res.status(200).json(user);
  };
}
