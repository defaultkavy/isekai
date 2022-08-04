import { HttpException } from "./HttpException.js";

export class Forbidden extends HttpException {
    constructor(message?: string) {
        super(message, 403)
    }
}