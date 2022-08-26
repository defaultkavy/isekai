"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const BaseDbObject_js_1 = require("./BaseDbObject.js");
class Image extends BaseDbObject_js_1.BaseDbObject {
    constructor(manager, builder) {
        super(manager);
        this.id = builder.id;
        this.createdTimestamp = builder.createdTimestamp;
        this.filename = builder.filename;
        this.url = builder.url;
        this.uploader = builder.uploader;
    }
    toData() {
        return {
            id: this.id,
            createdTimestamp: this.createdTimestamp,
            filename: this.filename,
            url: this.url,
            uploader: this.uploader.id,
        };
    }
}
exports.Image = Image;
//# sourceMappingURL=Image.js.map