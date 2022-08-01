import { BaseDbObject } from "./BaseDbObject.js";
import { Snowflake } from "./SnowflakeManager.js";
import { UserManager } from "./UserManager.js";

export class User extends BaseDbObject {
    /**
     * User snowflake id
     */
    id: Snowflake;
    /**
     * Username
     */
    name: string;
    constructor(manager: UserManager, options: UserOptions) {
        super(manager)
        this.id = options.id
        this.name = options.name
    }

    posts() {
        return this.client.posts.getPostByUser(this)
    }
    
    toData(): UserData {
        return {
            id: this.id,
            name: this.name
        }
    }
}

export interface UserOptions extends UserData {
}

export interface UserData{
    id: Snowflake,
    name: string
}