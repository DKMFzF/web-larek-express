import HttpError from './Base';

class BedRequest extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}

export default BedRequest;
