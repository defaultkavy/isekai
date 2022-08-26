import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { BaseManager } from "./BaseManager.js";
import { Image, ImagePrivateData, ImagePublicData } from "./Image.js";

export class ImageManager extends BaseManager<Image, ImagePublicData, ImageCreateData> {
    collection: DbCollection;
    type = 'Image';
    constructor(client: Client) {
        super(client);
        this.collection = this.client.db.images;
    }

    async build(data: ImagePrivateData): Promise<Image> {
        const user = await this.client.users.get(data.uploader)
        return new Image(this, {
            ...data,
            uploader: user
        })
    }
}

export interface ImageCreateData extends Omit<ImagePrivateData, 'createdTimestamp'> {}