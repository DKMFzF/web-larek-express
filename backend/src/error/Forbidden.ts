import HttpError from './Base';

class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, 403);
  }
}

export default ForbiddenError;
