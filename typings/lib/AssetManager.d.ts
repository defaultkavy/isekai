import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { BaseManager } from "./BaseManager.js";
import { Asset, AssetPrivateData, AssetPublicData } from "./Asset.js";
export declare class AssetManager extends BaseManager<Asset, AssetPublicData, AssetCreateData> {
    collection: DbCollection;
    type: string;
    constructor(client: Client);
    create(data: AssetCreateData): Promise<Asset>;
    build(data: AssetPrivateData): Promise<Asset>;
}
export interface AssetCreateData extends Omit<AssetPrivateData, 'createdTimestamp'> {
}
