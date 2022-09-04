import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { BaseManager } from "./BaseManager.js";
import { Asset, AssetData, AssetPrivateData, AssetPublicData } from "./Asset.js";
export declare class EventManager extends BaseManager<Asset, AssetPublicData, AssetCreateData> {
    collection: DbCollection<AssetData>;
    type: string;
    constructor(client: Client);
    create(data: AssetCreateData): Promise<Asset>;
    build(data: AssetPrivateData): Promise<Asset>;
}
export interface AssetCreateData extends Omit<AssetPrivateData, 'createdTimestamp'> {
}
