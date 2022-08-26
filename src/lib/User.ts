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
        this.intro = options.intro ?? '';
    }
    
    toData(): UserPrivateData {
        return {
            id: this.id,
            username: this.username,
            displayName: this.displayName,
            email: this.email,
            createdTimestamp: this.createdTimestamp,
            avatar: this.avatar ? this.avatar.toData() : undefined,
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
            intro: this.intro,
        }
    }
}

export interface UserBuilder extends Omit<UserPrivateData, 'avatar'> {
    avatar?: Asset;
}

export interface UserPrivateData extends UserPublicData {
    email: Email;
}

export interface UserPublicData extends BaseData {
    id: Snowflake;
    username: Username;
    displayName: string;
    avatar?: AssetPublicData;
    intro: string;
}

export type Username = string
export type Email = string