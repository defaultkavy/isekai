import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { AssetManager } from "./AssetManager.js";
import { Snowflake } from "./SnowflakeManager.js";
export declare class Asset extends BaseDbObject {
    id: Snowflake;
    createdTimestamp: number;
    filename: string;
    url: string;
    uploader: Snowflake;
    type: AssetTypes;
    constructor(manager: AssetManager, builder: AssetBuilder);
    toData(): AssetPublicData;
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
export declare enum AssetTypes {
    jpg = "image/jpeg",
    png = "image/png"
}
