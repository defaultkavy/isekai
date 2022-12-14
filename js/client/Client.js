"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const Database_js_1 = require("../database/Database.js");
const AssetManager_js_1 = require("../lib/AssetManager.js");
const EventManager_js_1 = require("../lib/event/EventManager.js");
const NotificationSubManager_js_1 = require("../lib/NotificationSubManager.js");
const PostManager_js_1 = require("../lib/PostManager.js");
const SnowflakeManager_js_1 = require("../lib/SnowflakeManager.js");
const UserManager_js_1 = require("../lib/UserManager.js");
class Client {
    constructor(options) {
        this.db = new Database_js_1.Database(this, options.db);
        this.users = new UserManager_js_1.UserManager(this);
        this.posts = new PostManager_js_1.PostManager(this);
        this.assets = new AssetManager_js_1.AssetManager(this);
        this.events = new EventManager_js_1.EventManager(this);
        this.notificationSubs = new NotificationSubManager_js_1.NotificationSubManager(this);
        this.snowflake = new SnowflakeManager_js_1.SnowflakeManager();
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map