import { HttpError } from './Base';

export class BedRequest extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}
