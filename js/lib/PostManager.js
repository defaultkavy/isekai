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
const BaseManager_js_1 = require("./BaseManager.js");
const MessagePost_js_1 = require("./MessagePost.js");
const User_js_1 = require("./User.js");
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
            return yield _super.__create.call(this, data);
        });
    }
    build(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.client.users.get(data.author);
            if (data.type === 'MESSAGE') {
                const messageData = data;
                return new MessagePost_js_1.MessagePost(this, Object.assign(Object.assign({}, messageData), { author: user, type: 'MESSAGE' }));
            }
            throw new HttpException_js_1.HttpException('Post type error');
        });
    }
    getPostByUser(user) {
        if (user instanceof User_js_1.User) {
            return Array.from(this.cache.values()).filter(post => post.author === user);
        }
        else {
            return Array.from(this.cache.values()).filter(post => post.author.id === user);
        }
    }
}
exports.PostManager = PostManager;
//# sourceMappingURL=PostManager.js.map