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
exports.BasePost = void 0;
const BaseDbObject_js_1 = require("./BaseDbObject.js");
const Event_js_1 = require("./event/Event.js");
class BasePost extends BaseDbObject_js_1.BaseDbObject {
    constructor(manager, options) {
        super(manager);
        this.id = options.id;
        this.author = options.author;
        this.createdTimestamp = options.createdTimestamp;
        this.type = options.type;
    }
    toData() {
        return {
            author: this.author.id,
            id: this.id,
            createdTimestamp: this.createdTimestamp,
            type: this.type
        };
    }
    toPublicData() {
        return Object.assign({}, this.toData());
    }
    toPrivateData() {
        return Object.assign({}, this.toData());
    }
    likes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.db.events.getDataByFilter({ post: this.id, activate: true, type: Event_js_1.EventTypes.like }, 50);
        });
    }
    clientLike(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.db.events.getDataByFilterOne({ post: this.id, user: userId, type: Event_js_1.EventTypes.like, activate: true });
        });
    }
}
exports.BasePost = BasePost;
//# sourceMappingURL=BasePost.js.map