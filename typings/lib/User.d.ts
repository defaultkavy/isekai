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
    avatar: AvatarData;
    createdTimestamp: number;
    constructor(manager: UserManager, options: UserOptions);
    toData(): UserPrivateData;
    toPublicData(): UserPublicData;
}
export interface UserOptions extends UserPrivateData {
}
export interface UserPrivateData extends UserPublicData {
    email: Email;
}
export interface UserPublicData extends BaseData {
    id: Snowflake;
    username: Username;
    displayName: string;
    avatar: AvatarData;
}
export interface AvatarData {
    url: string;
}
export declare type Username = string;
export declare type Email = string;
