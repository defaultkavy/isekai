import { BaseData, BaseDbObject } from "./BaseDbObject.js";
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

    createdTimestamp: number;
    constructor(manager: UserManager, options: UserOptions) {
        super(manager)
        this.id = options.id
        this.username = options.username
        this.displayName = options.displayName
        this.email = options.email
        this.createdTimestamp = options.createdTimestamp
    }

    posts() {
        return this.client.posts.getPostByUser(this)
    }
    
    toData(): UserData {
        return {
            id: this.id,
            username: this.username,
            displayName: this.displayName,
            email: this.email,
            createdTimestamp: this.createdTimestamp
        }
    }
}

export interface UserOptions extends UserData {
}

export interface UserData extends BaseData {
    id: Snowflake,
    username: Username,
    displayName: string
    email: Email
}

export type Username = string
export type Email = string