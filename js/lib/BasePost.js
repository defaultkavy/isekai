"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePost = void 0;
const BaseDbObject_js_1 = require("./BaseDbObject.js");
class BasePost extends BaseDbObject_js_1.BaseDbObject {
    constructor(manager, options) {
        super(manager);
        this.id = options.id;
        this.author = options.author;
    }
    toData() {
        return {
            author: this.author.id,
            id: this.id
        };
    }
}
exports.BasePost = BasePost;
//# sourceMappingURL=BasePost.js.map