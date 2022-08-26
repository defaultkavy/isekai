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
exports.FileManager = void 0;
const BaseManager_js_1 = require("./BaseManager.js");
const File_js_1 = require("./File.js");
class FileManager extends BaseManager_js_1.BaseManager {
    constructor(client) {
        super(client);
        this.type = 'Image';
        this.collection = this.client.db.images;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.__create(data);
        });
    }
    build(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.client.users.get(data.uploader);
            return new File_js_1.File(this, Object.assign(Object.assign({}, data), { uploader: user }));
        });
    }
}
exports.FileManager = FileManager;
//# sourceMappingURL=FileManager.js.map