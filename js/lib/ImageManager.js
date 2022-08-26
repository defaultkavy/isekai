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
exports.ImageManager = void 0;
const BaseManager_js_1 = require("./BaseManager.js");
const Image_js_1 = require("./Image.js");
class ImageManager extends BaseManager_js_1.BaseManager {
    constructor(client) {
        super(client);
        this.type = 'Image';
        this.collection = this.client.db.images;
    }
    build(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.client.users.get(data.uploader);
            return new Image_js_1.Image(this, Object.assign(Object.assign({}, data), { uploader: user }));
        });
    }
}
exports.ImageManager = ImageManager;
//# sourceMappingURL=ImageManager.js.map