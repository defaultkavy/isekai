"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeEvent = void 0;
const Event_js_1 = require("./Event.js");
class LikeEvent extends Event_js_1.Event {
    constructor(manager, builder) {
        super(manager, builder);
        this.post = builder.post;
        this.user = builder.user;
    }
    toData() {
        return Object.assign(Object.assign({}, super.toData()), { post: this.post, user: this.user });
    }
}
exports.LikeEvent = LikeEvent;
//# sourceMappingURL=LikeEvent.js.map