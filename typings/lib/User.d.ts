import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { Asset, AssetPublicData } from "./Asset.js";
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
    avatar?: Asset;
    cover?: Asset;
    intro: string;
    createdTimestamp: number;
    constructor(manager: UserManager, options: UserBuilder);
    toData(): UserData;
    toPublicData(): UserPublicData;
    toClientData(): UserClientData;
    toPrivateData(): UserPrivateData;
}
export interface UserBuilder extends Omit<UserPrivateData, 'avatar' | 'cover'> {
    avatar?: Asset;
    cover?: Asset;
}
export interface UserPrivateData extends UserPublicData {
    email: Email;
}
export interface UserPublicData extends BaseData {
    id: Snowflake;
    username: Username;
    displayName: string;
    avatar?: AssetPublicData;
    cover?: AssetPublicData;
    intro: string;
}
export interface UserClientData extends UserPublicData {
}
export interface UserData extends Omit<UserPrivateData, 'avatar' | 'cover'> {
    avatar?: Snowflake;
    cover?: Snowflake;
}
export declare type Username = string;
export declare type Email = string;
