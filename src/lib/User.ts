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
    username: Username
    /**
     * User profile display name
     */
    displayName: string;
    /**
     * User email address
     */
    email: Email;
    constructor(manager: UserManager, options: UserOptions) {
        super(manager)
        this.id = options.id
        this.username = options.username
        this.displayName = options.displayName
        this.email = options.email
    }

    posts() {
        return this.client.posts.getPostByUser(this)
    }
    
    toData(): UserData {
        return {
            id: this.id,
            username: this.username,
            displayName: this.displayName,
            email: this.email
        }
    }
}

export interface UserOptions extends UserData {
}

export interface UserData{
    id: Snowflake,
    username: Username,
    displayName: string
    email: Email
}

export type Username = string
export type Email = string