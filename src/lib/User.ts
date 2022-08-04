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
    /**
     * User email address
     */
    email: string;
    constructor(manager: UserManager, options: UserOptions) {
        super(manager)
        this.id = options.id
        this.name = options.name
        this.email = options.email
    }

    posts() {
        return this.client.posts.getPostByUser(this)
    }
    
    toData(): UserData {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        }
    }
}

export interface UserOptions extends UserData {
}

export interface UserData{
    id: Snowflake,
    name: Username
    email: Email
}

export type Username = string
export type Email = string