import { Db } from "mongodb";
import { Database } from "../database/Database.js";
import { FileManager } from "../lib/FileManager.js";
import { PostManager } from "../lib/PostManager.js";
import { SnowflakeManager } from "../lib/SnowflakeManager.js";
import { UserManager } from "../lib/UserManager.js";
export declare class Client {
    users: UserManager;
    posts: PostManager;
    db: Database;
    snowflake: SnowflakeManager;
    files: FileManager;
    constructor(options: ClientOptions);
}
export interface ClientOptions {
    db: Db;
}
