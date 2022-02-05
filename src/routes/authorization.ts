import { NextFunction, Request, Response, Router } from 'express';
import ForbiddenError from '../models/errors/forbidden';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication';
import JWT from 'jsonwebtoken';
import jwtAuthenticactionMiddleware from '../middlewares/jwt-authentication.middleware';

const authorizationRoute = Router();

authorizationRoute.post('/validate', jwtAuthenticactionMiddleware, (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(200);
});

authorizationRoute.post('/', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ForbiddenError('Uninformed user');
    }

    const payload = { username: user?.username };
    const secretKey = 'my_secret_key';
    const options = {
      subject: user?.uuid,
    };
    const jwt = JWT.sign(payload, secretKey, options);
    
    res.status(200).json({ token: jwt });
  } catch(error) {
    next(error);
  }
});

export default authorizationRoute;