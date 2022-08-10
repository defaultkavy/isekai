import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { Snowflake } from "./SnowflakeManager.js";
import { UserManager } from "./UserManager.js";
export declare class User extends BaseDbObject {
    /**
     * User snowflake id
     */
    id: Snowflake;
    /**
     * Username
     */
    username: Username;
    /**
     * User profile display name
     */
    displayName: string;
    /**
     * User email address
     */
    email: Email;
    createdTimestamp: number;
    constructor(manager: UserManager, options: UserOptions);
    posts(): import("./BasePost.js").BasePost[];
    toData(): UserData;
}
export interface UserOptions extends UserData {
}
export interface UserData extends BaseData {
    id: Snowflake;
    username: Username;
    displayName: string;
    email: Email;
}
export declare type Username = string;
export declare type Email = string;
