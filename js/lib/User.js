"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _User_avatar, _User_cover;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const BaseDbObject_js_1 = require("./BaseDbObject.js");
class User extends BaseDbObject_js_1.BaseDbObject {
    constructor(manager, builder) {
        var _a;
        super(manager);
        _User_avatar.set(this, void 0);
        _User_cover.set(this, void 0);
        this.id = builder.id;
        this.username = builder.username;
        this.displayName = builder.displayName;
        this.email = builder.email;
        this.createdTimestamp = builder.createdTimestamp;
        __classPrivateFieldSet(this, _User_avatar, builder.avatar, "f");
        __classPrivateFieldSet(this, _User_cover, builder.cover, "f");
        this.intro = (_a = builder.intro) !== null && _a !== void 0 ? _a : '';
    }
    getAvatar() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _User_avatar, "f"))
                throw undefined;
            return (_a = this.avatar) !== null && _a !== void 0 ? _a : (this.avatar = yield this.client.assets.fetch(__classPrivateFieldGet(this, _User_avatar, "f")));
        });
    }
    getCover() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _User_cover, "f"))
                throw undefined;
            return (_a = this.cover) !== null && _a !== void 0 ? _a : (this.cover = yield this.client.assets.fetch(__classPrivateFieldGet(this, _User_cover, "f")));
        });
    }
    toData() {
        return {
            id: this.id,
            username: this.username,
            displayName: this.displayName,
            email: this.email,
            createdTimestamp: this.createdTimestamp,
            avatar: __classPrivateFieldGet(this, _User_avatar, "f"),
            cover: __classPrivateFieldGet(this, _User_cover, "f"),
            intro: this.intro,
        };
    }
    toPublicData() {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, this.toData()), { avatar: yield this.getAvatar().then(obj => obj.toData()).catch(err => err), cover: yield this.getCover().then(obj => obj.toData()).catch(err => err) });
        });
    }
    toClientData() {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.assign({}, (yield this.toPublicData()));
        });
    }
}
exports.User = User;
_User_avatar = new WeakMap(), _User_cover = new WeakMap();
//# sourceMappingURL=User.js.map