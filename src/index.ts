import express, { Request, Response, NextFunction } from 'express';
import usersRoute from './routes/users';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', usersRoute);

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ foo: 'bar' });
});

// Initialize server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
