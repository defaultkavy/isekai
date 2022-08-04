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
        this.collection = collection;
    }
    checkIdDuplicate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this.collection.findOne({ id: id });
            return !!find;
        });
    }
    getData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this.collection.findOne({ id: id });
            if (!find)
                return null;
            return find;
        });
    }
    getDataByFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this.collection.findOne(filter);
            if (!find)
                return null;
            return find;
        });
    }
    saveData(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this.collection.findOne({ id: id });
            if (find) {
                return yield this.collection.replaceOne({ id: id }, data);
            }
            else {
                return yield this.collection.insertOne(data);
            }
        });
    }
    deleteData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection.deleteOne({ id: id });
        });
    }
}
exports.DbCollection = DbCollection;
//# sourceMappingURL=DbCollection.js.map