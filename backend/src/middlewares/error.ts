import { type NextFunction, type Request, type Response } from 'express';
import { CelebrateError, isCelebrateError } from 'celebrate';

import HttpError from '../error/Base';

function formatCelebrateError(err: CelebrateError) {
  const details = Array.from(err?.details?.values());

  return `${err.message}: ${details.map((e) => e.message).join(', ')}`;
}

const errorsHandler = (
  err: HttpError | CelebrateError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let status: number;
  let message: string;

  if (isCelebrateError(err)) {
    status = 400;
    message = formatCelebrateError(err);
  } else {
    status = err?.status || 500;
    message = err.message || 'Internal Server Error';
  }

  return res.status(status).send({ message });
};

export default errorsHandler;
