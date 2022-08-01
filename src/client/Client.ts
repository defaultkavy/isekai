import { Db } from "mongodb";
import { Database } from "../Database/Database.js";
import { PostManager } from "../lib/PostManager.js";
import { SnowflakeManager } from "../lib/SnowflakeManager.js";
import { UserManager } from "../lib/UserManager.js";

export class Client {
    users: UserManager;
    posts: PostManager;
    db: Database;
    snowflake: SnowflakeManager;
    constructor(options: ClientOptions) {
        this.db = new Database(this, options.db)
        this.users = new UserManager(this)
        this.posts = new PostManager(this)
        this.snowflake = new SnowflakeManager()
    }
}

export interface ClientOptions {
    db: Db
}