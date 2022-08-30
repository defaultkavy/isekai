"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const BaseDbObject_js_1 = require("./BaseDbObject.js");
class User extends BaseDbObject_js_1.BaseDbObject {
    constructor(manager, options) {
        var _a;
        super(manager);
        this.id = options.id;
        this.username = options.username;
        this.displayName = options.displayName;
        this.email = options.email;
        this.createdTimestamp = options.createdTimestamp;
        this.avatar = options.avatar;
        this.cover = options.cover;
        this.intro = (_a = options.intro) !== null && _a !== void 0 ? _a : '';
    }
    toData() {
        return {
            id: this.id,
            username: this.username,
            displayName: this.displayName,
            email: this.email,
            createdTimestamp: this.createdTimestamp,
            avatar: this.avatar ? this.avatar.id : undefined,
            cover: this.cover ? this.cover.id : undefined,
            intro: this.intro,
        };
    }
    toPublicData() {
        return {
            id: this.id,
            username: this.username,
            displayName: this.displayName,
            createdTimestamp: this.createdTimestamp,
            avatar: this.avatar ? this.avatar.toData() : undefined,
            cover: this.cover ? this.cover.toData() : undefined,
            intro: this.intro,
        };
    }
    toPrivateData() {
        return Object.assign(Object.assign({}, this.toPublicData()), { email: this.email });
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map