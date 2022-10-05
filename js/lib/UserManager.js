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
exports.UserManager = void 0;
const BaseManager_js_1 = require("./BaseManager.js");
const User_js_1 = require("./User.js");
const NotFound_js_1 = require("../errors/NotFound.js");
const Conflict_js_1 = require("../errors/Conflict.js");
/**
 * A manager to collect all user in the cache
 */
class UserManager extends BaseManager_js_1.BaseManager {
    constructor(parent) {
        super(parent);
        this.type = 'User';
        this.collection = this.client.db.users;
    }
    fetchUsers(ids, instance = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.collection.getDataByFilter({
                id: {
                    $in: ids
                }
            });
            if (!data)
                throw new NotFound_js_1.NotFound(`fetch: ${this.type} not exist with id`);
            if (instance === false) {
                return data;
            }
            else
                return yield this.__cacheSetList(data);
        });
    }
    fetchByUsername(username, instance = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.collection.getDataByFilterOne({ username: username });
            if (!data)
                throw new NotFound_js_1.NotFound(`fetch: ${this.type} not exist with username`);
            if (instance)
                return yield this.__cacheSet(data);
            else
                return data;
        });
    }
    fetchByEmail(email, instance = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.collection.getDataByFilterOne({ email: email });
            if (!data)
                throw new NotFound_js_1.NotFound(`fetch: ${this.type} not exist with email`);
            if (instance)
                return yield this.__cacheSet(data);
            else
                return data;
        });
    }
    create(data) {
        const _super = Object.create(null, {
            __create: { get: () => super.__create }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.collection.checkDuplicateByFilter({ username: data.username }))
                throw new Conflict_js_1.Conflict('create: username duplicated');
            if (yield this.collection.checkDuplicateByFilter({ email: data.email }))
                throw new Conflict_js_1.Conflict('create: email duplicated');
            return _super.__create.call(this, data);
        });
    }
    build(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const builder = Object.assign(Object.assign({}, data), { avatar: data.avatar ? yield this.client.assets.fetch(data.avatar).catch(err => undefined) : undefined, cover: data.cover ? yield this.client.assets.fetch(data.cover).catch(err => undefined) : undefined });
            return new User_js_1.User(this, builder);
        });
    }
}
exports.UserManager = UserManager;
//# sourceMappingURL=UserManager.js.map