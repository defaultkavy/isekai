"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
        this.message = message !== null && message !== void 0 ? message : 'Error';
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=HttpException.js.map