import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { AssetManager } from "./AssetManager.js";
import { Snowflake } from "./SnowflakeManager.js";

export class Asset extends BaseDbObject {
    id: Snowflake;
    createdTimestamp: number;
    filename: string;
    url: string;
    uploader: Snowflake;
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
            uploader: this.uploader,
            type: this.type
        }
    }
}



export interface AssetBuilder extends AssetPrivateData {
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

export interface AssetData extends AssetPrivateData {
    
}

export enum AssetTypes {
    jpg = 'image/jpeg',
    png = 'image/png',
}