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
        const _super = Object.create(null, {
            toPublicData: { get: () => super.toPublicData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, (yield _super.toPublicData.call(this))), { attachments: this.attachments.map(att => att.toData()), content: this.content });
        });
    }
    toClientData(user) {
        const _super = Object.create(null, {
            toClientData: { get: () => super.toClientData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, (yield _super.toClientData.call(this, user))), { attachments: this.attachments.map(att => att.toData()), content: this.content });
        });
    }
}
exports.MessagePost = MessagePost;
//# sourceMappingURL=MessagePost.js.map