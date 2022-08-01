"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterChannel = void 0;
const BaseChannel_js_1 = require("./BaseChannel.js");
const PostManager_js_1 = require("./PostManager.js");
class CharacterChannel extends BaseChannel_js_1.BaseChannel {
    constructor(parent, options) {
        super(parent.client, options);
        this.posts = new PostManager_js_1.PostManager(this);
    }
}
exports.CharacterChannel = CharacterChannel;
//# sourceMappingURL=CharacterChannel.js.map