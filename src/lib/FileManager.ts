import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { BaseManager } from "./BaseManager.js";
import { File, FilePrivateData, FilePublicData } from "./File.js";

export class FileManager extends BaseManager<File, FilePublicData, FileCreateData> {
    collection: DbCollection;
    type = 'Image';
    constructor(client: Client) {
        super(client);
        this.collection = this.client.db.images;
    }

    async build(data: FilePrivateData): Promise<File> {
        const user = await this.client.users.get(data.uploader)
        return new File(this, {
            ...data,
            uploader: user
        })
    }
}

export interface FileCreateData extends Omit<FilePrivateData, 'createdTimestamp'> {}