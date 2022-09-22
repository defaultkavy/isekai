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
exports.PostManager = void 0;
const HttpException_js_1 = require("../errors/HttpException.js");
const NotFound_js_1 = require("../errors/NotFound.js");
const BaseManager_js_1 = require("./BaseManager.js");
const MessagePost_js_1 = require("./MessagePost.js");
class PostManager extends BaseManager_js_1.BaseManager {
    constructor(client) {
        super(client);
        this.type = 'Post';
        this.collection = client.db.posts;
    }
    createMessagePost(data) {
        const _super = Object.create(null, {
            __create: { get: () => super.__create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.__create.call(this, Object.assign(Object.assign({}, data), { parent: undefined }));
        });
    }
    fetchByAuthor(author, limit = 20, lastId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = this.resolveId(author);
            const data = lastId
                ? yield this.collection.getDataByLastId(lastId, 20, { author: userId, parent: undefined })
                : yield this.collection.getDataByFilter({ author: userId, parent: undefined }, limit);
            if (!data)
                throw new NotFound_js_1.NotFound(`fetch: ${this.type} not exist with author`);
            return yield this.__cacheSetList(data);
        });
    }
    fetchByLastId(lastId, limit = 20) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.collection.getDataByLastId(lastId, limit, { parent: undefined });
            if (!data)
                throw new HttpException_js_1.HttpException(`Post fetch failed`);
            return yield this.__cacheSetList(data);
        });
    }
    fetchNewest(limit = 20) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.collection.getNewestData(limit, { parent: undefined });
            if (!data)
                throw new HttpException_js_1.HttpException(`Post fetch failed`);
            return yield this.__cacheSetList(data);
        });
    }
    build(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.type === 0 /* Message */) {
                const messageData = data;
                const attachments = [];
                if (messageData.attachments)
                    for (const att of messageData.attachments) {
                        const asset = this.client.assets.fetch(att);
                        attachments.push(asset);
                    }
                return new MessagePost_js_1.MessagePost(this, Object.assign(Object.assign({}, messageData), { type: 0 /* Message */, attachments: yield Promise.all(attachments) }));
            }
            throw new HttpException_js_1.HttpException('Post type error');
        });
    }
}
exports.PostManager = PostManager;
//# sourceMappingURL=PostManager.js.map