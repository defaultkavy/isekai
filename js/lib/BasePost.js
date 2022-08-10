"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePost = void 0;
const BaseDbObject_js_1 = require("./BaseDbObject.js");
class BasePost extends BaseDbObject_js_1.BaseDbObject {
    constructor(manager, options) {
        super(manager);
        this.id = options.id;
        this.author = options.author;
        this.createdTimestamp = options.createdTimestamp;
        this.type = options.type;
    }
    toData() {
        return {
            author: this.author.id,
            id: this.id,
            createdTimestamp: this.createdTimestamp,
            type: this.type
        };
    }
}
exports.BasePost = BasePost;
//# sourceMappingURL=BasePost.js.map