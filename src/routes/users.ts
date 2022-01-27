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

export default usersRoute;
