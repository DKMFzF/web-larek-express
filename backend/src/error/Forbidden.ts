import { HttpError } from './Base';

export class ForbiddenError extends HttpError {
    constructor(message: string) {
        super(message, 403);
    }
}

