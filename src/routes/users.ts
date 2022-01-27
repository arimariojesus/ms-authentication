import { NextFunction, Request, Response, Router } from 'express';

const usersRoute = Router();

usersRoute.get('/', (req: Request, res: Response, next: NextFunction) => {
  const users = [{ name: 'Joao', lastName: 'Foo', email: 'joao.foo@email.com' }];
  res.status(200).json(users);
});

usersRoute.get('/:uuid', (req: Request, res: Response, next: NextFunction) => {
  const uuid = parseInt(req.params.uuid);

  res.status(200).json({ uuid });
});

usersRoute.post('/:uuid', (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body;

  console.log(newUser);

  res.status(201).json(newUser);
});

usersRoute.put('/:uuid', (req: Request, res: Response, next: NextFunction) => {
  const uuid = parseInt(req.params.uuid);
  const modifiedUser = req.body;

  modifiedUser.uuid = uuid;

  res.status(200).json(modifiedUser);
});

usersRoute.delete('/:uuid', (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(200);
});

export default usersRoute;
