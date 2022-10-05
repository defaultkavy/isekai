"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypes = exports.Event = void 0;
const BaseDbObject_js_1 = require("../BaseDbObject.js");
class Event extends BaseDbObject_js_1.BaseDbObject {
    constructor(manager, builder) {
        super(manager);
        this.id = builder.id;
        this.createdTimestamp = builder.createdTimestamp;
        this.type = builder.type;
        this.subscribers = builder.subscribers;
    }
    toData() {
        return {
            id: this.id,
            createdTimestamp: this.createdTimestamp,
            type: this.type,
            subscribers: this.subscribers
        };
    }
}
exports.Event = Event;
var EventTypes;
(function (EventTypes) {
    EventTypes[EventTypes["like"] = 0] = "like";
})(EventTypes = exports.EventTypes || (exports.EventTypes = {}));
//# sourceMappingURL=Event.js.map