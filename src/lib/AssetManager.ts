import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { BaseManager } from "./BaseManager.js";
import { Asset, AssetPrivateData, AssetPublicData } from "./Asset.js";

export class AssetManager extends BaseManager<Asset, AssetPublicData, AssetCreateData> {
    collection: DbCollection;
    type = 'Image';
    constructor(client: Client) {
        super(client);
        this.collection = this.client.db.assets;
    }

    async create(data: AssetCreateData) {
        return await this.__create(data);
    }

    async build(data: AssetPrivateData): Promise<Asset> {
        return new Asset(this, data)
    }
}

export interface AssetCreateData extends Omit<AssetPrivateData, 'createdTimestamp'> {}