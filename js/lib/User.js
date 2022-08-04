"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const BaseDbObject_js_1 = require("./BaseDbObject.js");
class User extends BaseDbObject_js_1.BaseDbObject {
    constructor(manager, options) {
        super(manager);
        this.id = options.id;
        this.username = options.username;
        this.displayName = options.displayName;
        this.email = options.email;
    }
    posts() {
        return this.client.posts.getPostByUser(this);
    }
    toData() {
        return {
            id: this.id,
            username: this.username,
            displayName: this.displayName,
            email: this.email
        };
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map