import express, { Request, Response, NextFunction } from 'express';
import usersRoute from './routes/users';
import statusRoute from './routes/status';
import { errorHandler } from './middlewares/error-handler';
import authorizationRoute from './routes/authorization';
import jwtAuthenticactionMiddleware from './middlewares/jwt-authentication.middleware';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/status', statusRoute);
app.use('/token', authorizationRoute);
app.use('/users', jwtAuthenticactionMiddleware, usersRoute);

// Error Handlers
app.use(errorHandler);

// Initialize server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
