import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { AssetManager } from "./AssetManager.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";

export class Asset extends BaseDbObject {
    id: Snowflake;
    createdTimestamp: number;
    filename: string;
    url: string;
    uploader: User;
    type: AssetTypes;
    constructor(manager: AssetManager, builder: AssetBuilder) {
        super(manager);
        this.id = builder.id;
        this.createdTimestamp = builder.createdTimestamp;
        this.filename = builder.filename;
        this.url = builder.url;
        this.uploader = builder.uploader;
        this.type = builder.type;
    }

    toData(): AssetPublicData {
        return {
            id: this.id,
            createdTimestamp: this.createdTimestamp,
            filename: this.filename,
            url: this.url,
            uploader: this.uploader.id,
            type: this.type
        }
    }
}



export interface AssetBuilder extends Omit<AssetPrivateData, 'uploader'> {
    uploader: User;
}

export interface AssetPrivateData extends AssetPublicData {
}

export interface AssetPublicData extends BaseData {
    id: Snowflake;
    filename: string;
    url: string;
    uploader: Snowflake;
    type: AssetTypes;
}

export enum AssetTypes {
    jpg = 'image/jpeg',
    png = 'image/png',
}