import express, { Request, Response, NextFunction } from 'express';
import usersRoute from './routes/users';
import statusRoute from './routes/status';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', usersRoute);
app.use('/status', statusRoute);

// Initialize server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
