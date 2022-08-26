import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { FileManager } from "./FileManager.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";
export declare class File extends BaseDbObject {
    id: Snowflake;
    createdTimestamp: number;
    filename: string;
    url: string;
    uploader: User;
    type: FileTypes;
    constructor(manager: FileManager, builder: FileBuilder);
    toData(): FilePublicData;
}
export interface FileBuilder extends Omit<FilePrivateData, 'uploader'> {
    uploader: User;
}
export interface FilePrivateData extends FilePublicData {
}
export interface FilePublicData extends BaseData {
    id: Snowflake;
    filename: string;
    url: string;
    uploader: Snowflake;
    type: FileTypes;
}
export declare enum FileTypes {
    jpg = "image/jpeg",
    png = "image/png"
}
