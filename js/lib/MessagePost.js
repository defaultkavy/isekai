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
        return Object.assign(Object.assign({}, super.toData()), { attachments: this.attachments ? this.attachments.map(att => att.id) : undefined, content: this.content });
    }
    toPublicData() {
        return Object.assign(Object.assign({}, super.toData()), { attachments: this.attachments ? this.attachments.map(att => att.toData()) : undefined, content: this.content });
    }
    toPrivateData() {
        return Object.assign({}, this.toPublicData());
    }
}
exports.MessagePost = MessagePost;
//# sourceMappingURL=MessagePost.js.map