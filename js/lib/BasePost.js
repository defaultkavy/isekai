"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostTypes = exports.BasePost = void 0;
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
    toClientData() {
        return Object.assign({}, this.toData());
    }
}
exports.BasePost = BasePost;
var PostTypes;
(function (PostTypes) {
    PostTypes[PostTypes["Message"] = 0] = "Message";
    PostTypes[PostTypes["Article"] = 1] = "Article";
})(PostTypes = exports.PostTypes || (exports.PostTypes = {}));
//# sourceMappingURL=BasePost.js.map