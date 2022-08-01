"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
class Data {
    constructor(doc) {
        Object.assign(this, doc);
    }
    isPostData() {
        return true;
    }
    isUserData() {
        return true;
    }
}
exports.Data = Data;
//# sourceMappingURL=Data.js.map