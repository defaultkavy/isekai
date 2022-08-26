import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { ImageManager } from "./ImageManager.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";
export declare class Image extends BaseDbObject {
    id: Snowflake;
    createdTimestamp: number;
    filename: string;
    url: string;
    uploader: User;
    constructor(manager: ImageManager, builder: ImageBuilder);
    toData(): ImagePublicData;
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
