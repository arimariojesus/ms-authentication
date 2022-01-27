import express, { Request, Response, NextFunction } from 'express';
import usersRoute from './routes/users';

const app = express();

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ foo: 'bar' });
});

app.use('/users', usersRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
