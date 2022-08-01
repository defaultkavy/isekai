import { HttpException } from "./HttpException.js";

export class Conflict extends HttpException {
    constructor(message?: string) {
        super(message, 409)
    }
}