import { NextFunction, Request, Response, Router } from 'express';
import userRepository from '../repositories/user';

const usersRoute = Router();

usersRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAll();
  res.status(200).json(users);
});

usersRoute.get('/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid;
  const user = await userRepository.findById(uuid);

  res.status(200).send(user);
});

usersRoute.post('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body;

  const uuid = await userRepository.create(newUser);

  res.status(201).send(uuid);
});

usersRoute.put('/:uuid', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuid = parseInt(req.params.uuid);
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

usersRoute.delete('/:uuid', (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(200);
});

export default usersRoute;
