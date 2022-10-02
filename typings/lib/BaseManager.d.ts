import { Filter } from "mongodb";
import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { Base, Id } from "./Base.js";
import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { Snowflake } from "./SnowflakeManager.js";
export declare abstract class BaseManager<Object extends BaseDbObject, Data extends BaseData, ClientData extends BaseClientData> {
    client: Client;
    cache: Map<string, Object>;
    abstract collection: DbCollection<Data>;
    abstract type: string;
    constructor(client: Client);
    get(id: Snowflake): Promise<Object>;
    protected resolveId(idOrInstance: Snowflake | Id<Base>): string;
    fetch(resolve: Object | Snowflake): Promise<Object>;
    fetchByFilter(filter: Filter<Data>): Promise<Object>;
    protected __create(data: ClientData): Promise<Object>;
    delete(id: Snowflake): Promise<void>;
    protected __cacheSet(data: Data): Promise<Object>;
    protected __cacheSetList(arr: Data[]): Promise<Awaited<Object>[]>;
    protected abstract build(data: Data): Promise<Object>;
}
export declare type BaseClientData = Omit<BaseData, 'createdTimestamp'>;
