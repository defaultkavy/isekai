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
var _MessagePost_attachments;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePost = void 0;
const BasePost_js_1 = require("./BasePost.js");
class MessagePost extends BasePost_js_1.BasePost {
    constructor(manager, builder) {
        super(manager, builder);
        _MessagePost_attachments.set(this, void 0);
        __classPrivateFieldSet(this, _MessagePost_attachments, builder.attachments, "f");
        this.content = builder.content;
    }
    getAttachments() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = this.attachments) !== null && _a !== void 0 ? _a : (this.attachments = yield this.client.assets.fetch(__classPrivateFieldGet(this, _MessagePost_attachments, "f")));
        });
    }
    toData() {
        return Object.assign(Object.assign({}, super.toData()), { attachments: __classPrivateFieldGet(this, _MessagePost_attachments, "f"), content: this.content });
    }
    toPublicData() {
        const _super = Object.create(null, {
            toPublicData: { get: () => super.toPublicData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, (yield _super.toPublicData.call(this))), { attachments: (yield this.getAttachments()).map(att => att.toData()), content: this.content });
        });
    }
    toClientData(user) {
        const _super = Object.create(null, {
            toClientData: { get: () => super.toClientData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, (yield _super.toClientData.call(this, user))), { attachments: (yield this.getAttachments()).map(att => att.toData()), content: this.content });
        });
    }
}
exports.MessagePost = MessagePost;
_MessagePost_attachments = new WeakMap();
//# sourceMappingURL=MessagePost.js.map