import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { Base, Id } from "./Base.js";
import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { Snowflake } from "./SnowflakeManager.js";
export declare abstract class BaseManager<Object extends BaseDbObject, Data extends BaseData, ClientData extends BaseClientData> {
    client: Client;
    cache: Map<string, Object>;
    abstract collection: DbCollection;
    abstract type: string;
    constructor(client: Client);
    get(id: Snowflake): Promise<Object>;
    resolveId(idOrInstance: Snowflake | Id<Base>): string;
    fetch(resolve: Object | Snowflake): Promise<Object>;
    __create(data: ClientData): Promise<Object>;
    delete(id: Snowflake): Promise<void>;
    __cacheSet(data: Data): Promise<Object>;
    __cacheSetList(arr: Data[]): Promise<Object[]>;
    abstract build(data: Data): Promise<Object>;
}
export declare type BaseClientData = Omit<BaseData, 'createdTimestamp'>;
