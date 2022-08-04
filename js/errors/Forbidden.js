"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = void 0;
const HttpException_js_1 = require("./HttpException.js");
class Forbidden extends HttpException_js_1.HttpException {
    constructor(message) {
        super(message, 403);
    }
}
exports.Forbidden = Forbidden;
//# sourceMappingURL=Forbidden.js.map