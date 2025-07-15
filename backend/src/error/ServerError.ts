import { HttpError } from './Base';

export class ServerError extends HttpError {
  constructor(message: string) {
    super(message, 500);
  }
}
