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
exports.EventManager = void 0;
const NotFound_js_1 = require("../../errors/NotFound.js");
const BaseManager_js_1 = require("../BaseManager.js");
const Event_js_1 = require("./Event.js");
const LikeEvent_js_1 = require("./LikeEvent.js");
class EventManager extends BaseManager_js_1.BaseManager {
    constructor(client) {
        super(client);
        this.type = 'Event';
        this.collection = this.client.db.events;
    }
    createLike(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.__create(Object.assign(Object.assign({}, data), { type: Event_js_1.EventTypes.like }));
        });
    }
    fetchBySubscriber(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield this.client.db.events.getDataByFilter({
                subscribers: userId
            });
            if (!events)
                throw new NotFound_js_1.NotFound(`fetch: ${this.type} not exist.`);
            return this.__cacheSetList(events);
        });
    }
    build(data) {
        if (data.type === Event_js_1.EventTypes.like) {
            const likeData = data;
            likeData.activate = true;
            return new LikeEvent_js_1.LikeEvent(this, likeData);
        }
        else
            throw 'build: Event type error';
    }
}
exports.EventManager = EventManager;
//# sourceMappingURL=EventManager.js.map