"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelTypes = exports.BaseChannel = void 0;
const Base_js_1 = require("./Base.js");
class BaseChannel extends Base_js_1.Base {
    constructor(client, options) {
        super(client);
        this.owner = options.owner;
        this.type = options.type;
    }
}
exports.BaseChannel = BaseChannel;
var ChannelTypes;
(function (ChannelTypes) {
    ChannelTypes["CharacterChannel"] = "CHARACTER_CHANNEL";
})(ChannelTypes = exports.ChannelTypes || (exports.ChannelTypes = {}));
//# sourceMappingURL=BaseChannel.js.map