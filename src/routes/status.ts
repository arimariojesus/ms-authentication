import { Router, Request, Response } from 'express';

const statusRoute = Router();

statusRoute.get('/', (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default statusRoute;