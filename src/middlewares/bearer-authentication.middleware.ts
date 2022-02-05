import { NextFunction, Request, Response } from 'express';
import ForbiddenError from '../models/errors/forbidden';
import JWT from 'jsonwebtoken';

async function bearerAuthenticactionMiddleware(req: Request, res: Response, next: NextFunction) {
  try {

    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new ForbiddenError('Credentials not found');
    }

    const [authType, token] = authorizationHeader.split(' ');

    if (authType !== 'Bearer' || !token) {
      throw new ForbiddenError('Invalid authentication type');
    }

    const tokenPayload = JWT.verify(token, 'my_secret_key');

    if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
      throw new ForbiddenError('Invalid token');
    }

    const uuid = tokenPayload.sub;
    const user = { uuid, username: tokenPayload.username };
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

export default bearerAuthenticactionMiddleware;
