import HttpError from './Base';

class ObjectExists extends HttpError {
  constructor(message: string) {
    super(message, 409);
  }
}

export default ObjectExists;
