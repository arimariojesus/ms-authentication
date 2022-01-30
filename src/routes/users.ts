import { NextFunction, Request, Response, Router } from 'express';
import DatabaseError from '../models/errors/database';
import userRepository from '../repositories/user';

const usersRoute = Router();

usersRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAll();
  res.status(200).json(users);
});

usersRoute.get('/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  try {
    const uuid = req.params.uuid;
    const user = await userRepository.findById(uuid);
  
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

usersRoute.post('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body;

  const uuid = await userRepository.create(newUser);

  res.status(201).send(uuid);
});

usersRoute.put('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuid = req.params.uuid;
    const modifiedUser = {
      ...req.body,
      uuid,
    };

    await userRepository.update(modifiedUser);

    res.status(200).send();
  } catch {
    res.status(400).send('Error updating user');
  }
});

usersRoute.delete('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuid = req.params.uuid;
  
    await userRepository.remove(uuid);

    res.status(200).send();
  } catch {
    res.status(400).send('Error deleting user');
  }
});

export default usersRoute;
