"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const HttpException_js_1 = require("./HttpException.js");
class NotFound extends HttpException_js_1.HttpException {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFound = NotFound;
//# sourceMappingURL=NotFound.js.map