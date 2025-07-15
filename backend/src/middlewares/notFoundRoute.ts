import { type Request, type Response, type NextFunction } from 'express';
import { NotFoundError } from '../error';

export const errorNotFoundRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => next(new NotFoundError(`${req.url} - not found`));
