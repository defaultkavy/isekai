"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetTypes = exports.Asset = void 0;
const BaseDbObject_js_1 = require("./BaseDbObject.js");
class Asset extends BaseDbObject_js_1.BaseDbObject {
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
            uploader: this.uploader,
            type: this.type
        };
    }
}
exports.Asset = Asset;
var AssetTypes;
(function (AssetTypes) {
    AssetTypes["jpg"] = "image/jpeg";
    AssetTypes["png"] = "image/png";
})(AssetTypes = exports.AssetTypes || (exports.AssetTypes = {}));
//# sourceMappingURL=Asset.js.map