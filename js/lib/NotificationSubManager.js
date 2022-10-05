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
exports.NotificationSubManager = void 0;
const NotFound_js_1 = require("../errors/NotFound.js");
const BaseManager_js_1 = require("./BaseManager.js");
const NotificationSub_js_1 = require("./NotificationSub.js");
class NotificationSubManager extends BaseManager_js_1.BaseManager {
    constructor(client) {
        super(client);
        this.type = 'Notification Subscribe';
        this.collection = this.client.db.notificationSubs;
    }
    subscribe(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const duplicateData = yield this.collection.getDataByFilterOne({ keys: data.keys, userId: data.userId });
            if (duplicateData)
                return this.build(duplicateData);
            return yield this.__create(data);
        });
    }
    fetchByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const subs = yield this.collection.getDataByFilter({ userId: userId });
            if (!subs)
                throw new NotFound_js_1.NotFound(`fetch: ${this.type} not exist with user`);
            return this.__cacheSetList(subs);
        });
    }
    build(data) {
        return new NotificationSub_js_1.NotificationSub(this, data);
    }
}
exports.NotificationSubManager = NotificationSubManager;
//# sourceMappingURL=NotificationSubManager.js.map