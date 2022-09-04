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
const BaseManager_js_1 = require("./BaseManager.js");
const Asset_js_1 = require("./Asset.js");
class EventManager extends BaseManager_js_1.BaseManager {
    constructor(client) {
        super(client);
        this.type = 'Asset';
        this.collection = this.client.db.assets;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.__create(data);
        });
    }
    build(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Asset_js_1.Asset(this, data);
        });
    }
}
exports.EventManager = EventManager;
//# sourceMappingURL=EventManager.js.map