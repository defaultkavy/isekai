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
exports.LikeEvent = void 0;
const Event_js_1 = require("./Event.js");
class LikeEvent extends Event_js_1.Event {
    constructor(manager, builder) {
        super(manager, builder);
        this.post = builder.post;
        this.user = builder.user;
        this.activate = builder.activate;
    }
    deactive() {
        return __awaiter(this, void 0, void 0, function* () {
            this.activate = false;
            yield this.delete();
        });
    }
    toNotification() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.client.users.fetch(this.user);
            return {
                id: this.id,
                content: `${user.displayName} liked your post`,
                image: (yield user.getAvatar().then(avatar => avatar.toData()).catch(err => undefined)),
                type: this.type,
                createdTimestamp: this.createdTimestamp
            };
        });
    }
    toData() {
        return Object.assign(Object.assign({}, super.toData()), { post: this.post, user: this.user, activate: this.activate });
    }
}
exports.LikeEvent = LikeEvent;
//# sourceMappingURL=LikeEvent.js.map