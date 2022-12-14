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
    constructor(manager, builder) {
        super(manager);
        this.id = builder.id;
        this.author = builder.author;
        this.createdTimestamp = builder.createdTimestamp;
        this.type = builder.type;
        this.parent = builder.parent;
    }
    toData() {
        return {
            author: this.author,
            id: this.id,
            createdTimestamp: this.createdTimestamp,
            type: this.type,
            parent: this.parent
        };
    }
    toPublicData() {
        return __awaiter(this, void 0, void 0, function* () {
            const threads = yield this.threadCount();
            const thread = threads ? (yield this.latestThread()) : undefined;
            return Object.assign(Object.assign({}, this.toData()), { likes: yield this.likeCount(), threads: threads, thread: thread ? thread.toData() : undefined });
        });
    }
    toClientData(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, (yield this.toPublicData())), { like: !!(yield this.clientLike(user)) });
        });
    }
    reply(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.posts.createReply(data, this.id);
        });
    }
    latestThread() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.posts.fetchLatestThread(this.id);
        });
    }
    threads(lastId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.posts.fetchThreads(this.id, lastId);
        });
    }
    threadCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.db.posts.getCount({ parent: this.id });
        });
    }
    likeCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.db.events.getCount({ post: this.id, activate: true, type: Event_js_1.EventTypes.like });
        });
    }
    likeUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.db.events.getDataByFilter({ post: this.id, activate: true, type: Event_js_1.EventTypes.like }, 50);
        });
    }
    clientLike(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.events.fetchByFilter({ post: this.id, user: userId, type: Event_js_1.EventTypes.like, activate: true }).catch(err => undefined);
        });
    }
}
exports.BasePost = BasePost;
//# sourceMappingURL=BasePost.js.map