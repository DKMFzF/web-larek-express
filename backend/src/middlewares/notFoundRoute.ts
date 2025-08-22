import { type Request, type Response, type NextFunction } from 'express';
import NotFoundError from '../error/NotFound';

const errorNotFoundRoute = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => next(new NotFoundError(`${req.url} - not found`));

export default errorNotFoundRoute;
