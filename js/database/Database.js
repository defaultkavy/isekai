"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionName = exports.Database = void 0;
const Base_js_1 = require("../lib/Base.js");
const DbCollection_js_1 = require("./DbCollection.js");
class Database extends Base_js_1.Base {
    constructor(client, db) {
        super(client);
        this.db = db;
        this.users = new DbCollection_js_1.DbCollection(this, db.collection(CollectionName.users));
        this.posts = new DbCollection_js_1.DbCollection(this, db.collection(CollectionName.posts));
        this.assets = new DbCollection_js_1.DbCollection(this, db.collection(CollectionName.assets));
        this.events = new DbCollection_js_1.DbCollection(this, db.collection(CollectionName.events));
    }
}
exports.Database = Database;
var CollectionName;
(function (CollectionName) {
    CollectionName["users"] = "users";
    CollectionName["posts"] = "posts";
    CollectionName["assets"] = "assets";
    CollectionName["events"] = "events";
})(CollectionName = exports.CollectionName || (exports.CollectionName = {}));
//# sourceMappingURL=Database.js.map