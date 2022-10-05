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

    protected avatar?: Asset;
    #avatar?: Snowflake;
    protected cover?: Asset;
    #cover?: Snowflake;
    intro: string;

    createdTimestamp: number;
    constructor(manager: UserManager, builder: UserBuilder) {
        super(manager)
        this.id = builder.id;
        this.username = builder.username;
        this.displayName = builder.displayName;
        this.email = builder.email;
        this.createdTimestamp = builder.createdTimestamp;
        this.#avatar = builder.avatar;
        this.#cover = builder.cover;
        this.intro = builder.intro ?? '';
    }

    async getAvatar() {
        if (!this.#avatar) throw undefined;
        return this.avatar ?? (this.avatar = await this.client.assets.fetch(this.#avatar));
    }

    async getCover() {
        if (!this.#cover) throw undefined;
        return this.cover ?? (this.cover = await this.client.assets.fetch(this.#cover));
    }

    setAvatar(asset: Asset) {
        this.avatar = asset;
        this.#avatar = asset.id;
    }

    setCover(asset: Asset) {
        this.cover = asset;
        this.#cover = asset.id;
    }
    
    toData(): UserData {
        return {
            id: this.id,
            username: this.username,
            displayName: this.displayName,
            email: this.email,
            createdTimestamp: this.createdTimestamp,
            avatar: this.#avatar,
            cover: this.#cover,
            intro: this.intro,
        }
    }

    async toPublicData(): Promise<UserPublicData> {
        return {
            ...this.toData(),
            avatar: await this.getAvatar().then(obj => obj.toData()).catch(err => err),
            cover: await this.getCover().then(obj => obj.toData()).catch(err => err),
        }
    }

    async toClientData(): Promise<UserClientData> {
        return {
            ...(await this.toPublicData())
        }
    }
}

export interface UserBuilder extends Omit<UserPrivateData, 'avatar' | 'cover'> {
    avatar?: Snowflake;
    cover?: Snowflake;
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