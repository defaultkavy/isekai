import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { ImageManager } from "./ImageManager.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";

export class Image extends BaseDbObject {
    id: Snowflake;
    createdTimestamp: number;
    filename: string;
    url: string;
    uploader: User;
    constructor(manager: ImageManager, builder: ImageBuilder) {
        super(manager);
        this.id = builder.id;
        this.createdTimestamp = builder.createdTimestamp;
        this.filename = builder.filename;
        this.url = builder.url;
        this.uploader = builder.uploader;
    }

    toData(): ImagePublicData {
        return {
            id: this.id,
            createdTimestamp: this.createdTimestamp,
            filename: this.filename,
            url: this.url,
            uploader: this.uploader.id,
        }
    }
}



export interface ImageBuilder extends Omit<ImagePrivateData, 'uploader'> {
    uploader: User;
}

export interface ImagePrivateData extends ImagePublicData {
}

export interface ImagePublicData extends BaseData {
    id: Snowflake;
    filename: string;
    url: string;
    uploader: Snowflake;
}