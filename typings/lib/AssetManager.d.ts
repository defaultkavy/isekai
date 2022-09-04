import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { BaseManager } from "./BaseManager.js";
import { Asset, AssetData } from "./Asset.js";
export declare class AssetManager extends BaseManager<Asset, AssetData, AssetCreateData> {
    collection: DbCollection<AssetData>;
    type: string;
    constructor(client: Client);
    create(data: AssetCreateData): Promise<Asset>;
    build(data: AssetData): Promise<Asset>;
}
export interface AssetCreateData extends Omit<AssetData, 'createdTimestamp'> {
}
