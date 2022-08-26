"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileTypes = exports.File = void 0;
const BaseDbObject_js_1 = require("./BaseDbObject.js");
class File extends BaseDbObject_js_1.BaseDbObject {
    constructor(manager, builder) {
        super(manager);
        this.id = builder.id;
        this.createdTimestamp = builder.createdTimestamp;
        this.filename = builder.filename;
        this.url = builder.url;
        this.uploader = builder.uploader;
        this.type = builder.type;
    }
    toData() {
        return {
            id: this.id,
            createdTimestamp: this.createdTimestamp,
            filename: this.filename,
            url: this.url,
            uploader: this.uploader.id,
            type: this.type
        };
    }
}
exports.File = File;
var FileTypes;
(function (FileTypes) {
    FileTypes["jpg"] = "image/jpeg";
    FileTypes["png"] = "image/png";
})(FileTypes = exports.FileTypes || (exports.FileTypes = {}));
//# sourceMappingURL=File.js.map