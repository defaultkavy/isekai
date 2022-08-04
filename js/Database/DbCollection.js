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
exports.DbCollection = void 0;
const Base_js_1 = require("../lib/Base.js");
class DbCollection extends Base_js_1.Base {
    constructor(parent, collection) {
        super(parent.client);
        this._collection = collection;
    }
    checkDuplicate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this._collection.findOne({ id: id });
            return !!find;
        });
    }
    checkDuplicateByFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this._collection.findOne(filter);
            return !!find;
        });
    }
    getData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this._collection.findOne({ id: id });
            if (!find)
                return null;
            return find;
        });
    }
    getDataByFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this._collection.findOne(filter);
            if (!find)
                return null;
            return find;
        });
    }
    saveData(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._collection.updateOne({ id: id }, { $set: data }, { upsert: true });
        });
    }
    deleteData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._collection.deleteOne({ id: id });
        });
    }
}
exports.DbCollection = DbCollection;
//# sourceMappingURL=DbCollection.js.map