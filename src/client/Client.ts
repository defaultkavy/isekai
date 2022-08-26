import { Db } from "mongodb";
import { Database } from "../database/Database.js";
import { AssetManager } from "../lib/AssetManager.js";
import { PostManager } from "../lib/PostManager.js";
import { SnowflakeManager } from "../lib/SnowflakeManager.js";
import { UserManager } from "../lib/UserManager.js";

export class Client {
    users: UserManager;
    posts: PostManager;
    db: Database;
    snowflake: SnowflakeManager;
    assets: AssetManager;
    constructor(options: ClientOptions) {
        this.db = new Database(this, options.db);
        this.users = new UserManager(this);
        this.posts = new PostManager(this);
        this.assets = new AssetManager(this);
        this.snowflake = new SnowflakeManager();
    }
}

export interface ClientOptions {
    db: Db
}