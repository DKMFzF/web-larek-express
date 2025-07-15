import { HttpError } from './Base';

export class ObjectExists extends HttpError {
  constructor(message: string) {
    super(message, 409);
  }
}
