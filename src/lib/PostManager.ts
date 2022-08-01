import { Client } from "../client/Client.js";
import { DbCollection } from "../Database/DbCollection.js";
import { BaseManager } from "./BaseManager.js";
import { Post, PostData } from "./Post.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";

export class PostManager extends BaseManager<Post, PostData> {
    collection: DbCollection;
    type = 'Post'
    constructor(client: Client) {
        super(client)
        this.collection = client.db.posts
    }

    async build(data: PostData): Promise<Post> {
        const user = await this.client.users.get(data.author)
        return new Post(this, {
            id: data.id,
            author: user
        })
    }

    getPostByUser(user: User | Snowflake) {
        if (user instanceof User) {
            return Array.from(this.cache.values()).filter(post => post.author === user)
        } else {
            return Array.from(this.cache.values()).filter(post => post.author.id === user)
        }
    }
}