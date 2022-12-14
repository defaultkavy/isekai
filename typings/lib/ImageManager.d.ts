import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { BaseManager } from "./BaseManager.js";
import { File, FilePrivateData, FilePublicData } from "./Image.js";
export declare class FileManager extends BaseManager<File, FilePublicData, FileCreateData> {
    collection: DbCollection;
    type: string;
    constructor(client: Client);
    build(data: FilePrivateData): Promise<File>;
}
export interface FileCreateData extends Omit<FilePrivateData, 'createdTimestamp'> {
}
