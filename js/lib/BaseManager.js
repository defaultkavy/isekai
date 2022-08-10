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
exports.BaseManager = void 0;
const Conflict_js_1 = require("../errors/Conflict.js");
const NotFound_js_1 = require("../errors/NotFound.js");
class BaseManager {
    constructor(client) {
        this.client = client;
        this.cache = new Map();
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const get = this.cache.get(id);
            if (get)
                return get;
            return yield this.fetch(id);
        });
    }
    resolveId(idOrInstance) {
        if (typeof idOrInstance === 'string') {
            return idOrInstance;
        }
        else {
            return idOrInstance.id;
        }
    }
    fetch(resolve) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.resolveId(resolve);
            const data = yield this.collection.getData(id);
            if (!data)
                throw new NotFound_js_1.NotFound(`fetch: ${this.type} not exist.`);
            return this.__cacheSet(data);
        });
    }
    __create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.cache.has(data.id)
                || (yield this.collection.checkDuplicate(data.id)))
                throw new Conflict_js_1.Conflict(`create: ${this.type} id existed.`);
            Object.assign(data, { createdTimestamp: +new Date() });
            const object = yield this.build(data);
            this.cache.set(object.id, object);
            yield object.save();
            return object;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const object = yield this.get(id);
            object.delete();
        });
    }
    __cacheSet(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const object = yield this.build(data);
            this.cache.set(object.id, object);
            return object;
        });
    }
    __cacheSetList(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            const objects = [];
            for (const data of arr) {
                objects.push(yield this.__cacheSet(data));
            }
            return objects;
        });
    }
}
exports.BaseManager = BaseManager;
//# sourceMappingURL=BaseManager.js.map