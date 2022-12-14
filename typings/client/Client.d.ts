import { Db } from "mongodb";
import { Database } from "../database/Database.js";
import { AssetManager } from "../lib/AssetManager.js";
import { EventManager } from "../lib/event/EventManager.js";
import { NotificationSubManager } from "../lib/NotificationSubManager.js";
import { PostManager } from "../lib/PostManager.js";
import { SnowflakeManager } from "../lib/SnowflakeManager.js";
import { UserManager } from "../lib/UserManager.js";
export declare class Client {
    users: UserManager;
    posts: PostManager;
    db: Database;
    snowflake: SnowflakeManager;
    assets: AssetManager;
    events: EventManager;
    notificationSubs: NotificationSubManager;
    constructor(options: ClientOptions);
}
export interface ClientOptions {
    db: Db;
}
