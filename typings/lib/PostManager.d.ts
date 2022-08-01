import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { BaseManager } from "./BaseManager.js";
import { Post, PostData } from "./Post.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";
export declare class PostManager extends BaseManager<Post, PostData> {
    collection: DbCollection;
    type: string;
    constructor(client: Client);
    build(data: PostData): Promise<Post>;
    getPostByUser(user: User | Snowflake): Post[];
}
