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
const mongodb_1 = require("mongodb");
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
    getCount(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._collection.countDocuments(filter);
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
    getDataByFilterOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this._collection.findOne(filter);
            if (!find)
                return null;
            return find;
        });
    }
    getDataByFilter(filter, limit = 100) {
        return __awaiter(this, void 0, void 0, function* () {
            const cursor = this._collection.find(filter !== null && filter !== void 0 ? filter : {}).limit(limit);
            const find = yield cursor.toArray();
            if (!find)
                return null;
            return find;
        });
    }
    getDataByLastId(id, limit = 100, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const int = mongodb_1.Long.fromString(id);
            const cursor = this._collection.find(Object.assign(Object.assign({}, filter), { $expr: { $lt: [{ '$toLong': '$id' }, int] } })).limit(limit);
            const find = yield cursor.toArray();
            return find;
        });
    }
    getNewestData(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const cursor = this._collection.find().sort({ $natural: -1 }).limit(limit !== null && limit !== void 0 ? limit : 100);
            const find = yield cursor.toArray();
            return find;
        });
    }
    getArraySlice(id, arrayField, slice) {
        return __awaiter(this, void 0, void 0, function* () {
            const cursor = this._collection.find({ id: id }).project({ [arrayField]: { $slice: slice } });
            const find = yield cursor.toArray();
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