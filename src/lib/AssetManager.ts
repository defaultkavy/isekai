import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { BaseManager } from "./BaseManager.js";
import { Asset, AssetData } from "./Asset.js";

export class AssetManager extends BaseManager<Asset, AssetData, AssetCreateData> {
    collection: DbCollection<AssetData>;
    type = 'Asset';
    constructor(client: Client) {
        super(client);
        this.collection = this.client.db.assets;
    }

    async create(data: AssetCreateData) {
        return await this.__create(data);
    }

    build(data: AssetData): Asset {
        return new Asset(this, data)
    }
}

export interface AssetCreateData extends Omit<AssetData, 'createdTimestamp'> {}