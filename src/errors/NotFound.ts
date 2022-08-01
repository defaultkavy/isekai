import { HttpException } from "./HttpException.js";

export class NotFound extends HttpException {
    constructor(message?: string) {
        super(message, 404)
    }
}