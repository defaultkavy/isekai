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
exports.BaseDbObject = void 0;
const Base_js_1 = require("./Base.js");
class BaseDbObject extends Base_js_1.Base {
    constructor(manager) {
        super(manager.client);
        this.manager = manager;
        this.collection = manager.collection;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.toData();
            yield this.collection.saveData(this.id, data);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            this.clear();
            yield this.collection.deleteData(this.id);
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            this.manager.cache.delete(this.id);
        });
    }
}
exports.BaseDbObject = BaseDbObject;
//# sourceMappingURL=BaseDbObject.js.map