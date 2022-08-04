import { BaseDbObject } from "./BaseDbObject.js";
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
    name: string;
    /**
     * User email address
     */
    email: string;
    constructor(manager: UserManager, options: UserOptions);
    posts(): import("./Post.js").Post[];
    toData(): UserData;
}
export interface UserOptions extends UserData {
}
export interface UserData {
    id: Snowflake;
    name: Username;
    email: Email;
}
export declare type Username = string;
export declare type Email = string;
