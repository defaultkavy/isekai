import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { FileManager } from "./FileManager.js";
import { Snowflake } from "./SnowflakeManager.js";
import { User } from "./User.js";

export class File extends BaseDbObject {
    id: Snowflake;
    createdTimestamp: number;
    filename: string;
    url: string;
    uploader: User;
    type: FileTypes;
    constructor(manager: FileManager, builder: FileBuilder) {
        super(manager);
        this.id = builder.id;
        this.createdTimestamp = builder.createdTimestamp;
        this.filename = builder.filename;
        this.url = builder.url;
        this.uploader = builder.uploader;
        this.type = builder.type;
    }

    toData(): FilePublicData {
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

export enum FileTypes {
    jpg = 'image/jpeg',
    png = 'image/png',
}