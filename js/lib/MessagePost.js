"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePost = void 0;
const BasePost_js_1 = require("./BasePost.js");
class MessagePost extends BasePost_js_1.BasePost {
    constructor(manager, options) {
        super(manager, options);
        this.attachments = options.attachments;
        this.content = options.content;
    }
    toData() {
        return Object.assign(Object.assign({}, super.toData()), { attachments: this.attachments ? this.attachments.map(att => att.toData()) : undefined, content: this.content });
    }
    toClientData() {
        return Object.assign({}, this.toData());
    }
}
exports.MessagePost = MessagePost;
//# sourceMappingURL=MessagePost.js.map