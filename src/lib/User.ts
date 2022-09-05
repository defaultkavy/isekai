import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { Asset, AssetPublicData } from "./Asset.js";
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

    avatar?: Asset;

    cover?: Asset;

    intro: string;

    createdTimestamp: number;
    constructor(manager: UserManager, options: UserBuilder) {
        super(manager)
        this.id = options.id;
        this.username = options.username;
        this.displayName = options.displayName;
        this.email = options.email;
        this.createdTimestamp = options.createdTimestamp;
        this.avatar = options.avatar;
        this.cover = options.cover;
        this.intro = options.intro ?? '';
    }
    
    toData(): UserData {
        return {
            id: this.id,
            username: this.username,
            displayName: this.displayName,
            email: this.email,
            createdTimestamp: this.createdTimestamp,
            avatar: this.avatar ? this.avatar.id : undefined,
            cover: this.cover ? this.cover.id : undefined,
            intro: this.intro,
        }
    }

    toPublicData(): UserPublicData {
        return {
            id: this.id,
            username: this.username,
            displayName: this.displayName,
            createdTimestamp: this.createdTimestamp,
            avatar: this.avatar ? this.avatar.toData() : undefined,
            cover: this.cover ? this.cover.toData() : undefined,
            intro: this.intro,
        }
    }

    toClientData(): UserClientData {
        return {
            ...this.toPublicData()
        }
    }

    toPrivateData(): UserPrivateData {
        return {
            ...this.toPublicData(),
            email: this.email
        }
    }
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

export type Username = string
export type Email = string