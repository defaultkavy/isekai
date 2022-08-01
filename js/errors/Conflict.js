"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conflict = void 0;
const HttpException_js_1 = require("./HttpException.js");
class Conflict extends HttpException_js_1.HttpException {
    constructor(message) {
        super(message, 409);
    }
}
exports.Conflict = Conflict;
//# sourceMappingURL=Conflict.js.map