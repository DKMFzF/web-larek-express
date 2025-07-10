import { HttpError } from './Base';

export class NotFoundError extends HttpError {
    constructor(message: string) {
        super(message, 404)
    }
}

