"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSub = void 0;
const BaseDbObject_js_1 = require("./BaseDbObject.js");
class NotificationSub extends BaseDbObject_js_1.BaseDbObject {
    constructor(manager, builder) {
        super(manager);
        this.id = builder.id;
        this.createdTimestamp = builder.createdTimestamp;
        this.endpoint = builder.endpoint;
        this.userId = builder.userId;
        this.keys = builder.keys;
    }
    toData() {
        return {
            id: this.id,
            createdTimestamp: this.createdTimestamp,
            endpoint: this.endpoint,
            userId: this.userId,
            keys: this.keys,
        };
    }
}
exports.NotificationSub = NotificationSub;
//# sourceMappingURL=NotificationSub.js.map