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
/**
 * A manager to collect all user in the cache
 */
class UserManager extends BaseManager_js_1.BaseManager {
    constructor(parent) {
        super(parent);
        this.type = 'User';
        this.collection = this.client.db.users;
    }
    fetchByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.collection.getDataByFilter({ username: username });
            if (!data)
                throw new NotFound_js_1.NotFound(`fetch: ${this.type} not exist.`);
            return yield this.cacheSet(data);
        });
    }
    fetchByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.collection.getDataByFilter({ email: email });
            if (!data)
                throw new NotFound_js_1.NotFound(`fetch: ${this.type} not exist.`);
            return yield this.cacheSet(data);
        });
    }
    build(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new User_js_1.User(this, {
                id: data.id,
                name: data.name,
                email: data.email
            });
        });
    }
}
exports.UserManager = UserManager;
//# sourceMappingURL=UserManager.js.map