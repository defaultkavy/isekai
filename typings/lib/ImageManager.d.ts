import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { BaseManager } from "./BaseManager.js";
import { Image, ImagePrivateData, ImagePublicData } from "./Image.js";
export declare class ImageManager extends BaseManager<Image, ImagePublicData, ImageCreateData> {
    collection: DbCollection;
    type: string;
    constructor(client: Client);
    build(data: ImagePrivateData): Promise<Image>;
}
export interface ImageCreateData extends Omit<ImagePrivateData, 'createdTimestamp'> {
}
