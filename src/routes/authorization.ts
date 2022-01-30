import { NextFunction, Request, Response, Router } from 'express';
import ForbiddenError from '../models/errors/forbidden';
import userRepository from '../repositories/user';

const authorizationRoute = Router();

authorizationRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers['authorization'];
  
    if (!authorizationHeader) {
      throw new ForbiddenError('Credentials not found');
    }

    const [authType, token] = authorizationHeader.split(' ');

    if (authType !== 'Basic' || !token) {
      throw new ForbiddenError('Invalid authentication type');
    }

    const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

    const [username, password] = tokenContent.split(':');

    if (!username || !password) {
      throw new ForbiddenError('Credentials empty');
    }

    const user = await userRepository.findByUsernameAndPassword(username, password);
    console.log({ user });

  } catch(error) {
    next(error);
  }
});

export default authorizationRoute;