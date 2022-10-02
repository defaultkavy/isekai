import { Db } from "mongodb";
import { Database } from "../database/Database.js";
import { AssetManager } from "../lib/AssetManager.js";
import { EventManager } from "../lib/event/EventManager.js";
import { NotificationSubManager } from "../lib/NotificationSubManager.js";
import { PostManager } from "../lib/PostManager.js";
import { SnowflakeManager } from "../lib/SnowflakeManager.js";
import { UserManager } from "../lib/UserManager.js";

export class Client {
    users: UserManager;
    posts: PostManager;
    db: Database;
    snowflake: SnowflakeManager;
    assets: AssetManager;
    events: EventManager;
    notificationSubs: NotificationSubManager;
    constructor(options: ClientOptions) {
        this.db = new Database(this, options.db);
        this.users = new UserManager(this);
        this.posts = new PostManager(this);
        this.assets = new AssetManager(this);
        this.events = new EventManager(this);
        this.notificationSubs = new NotificationSubManager(this);
        this.snowflake = new SnowflakeManager();
    }
}

export interface ClientOptions {
    db: Db
}