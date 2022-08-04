import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { Base, Id } from "./Base.js";
import { BaseDbObject, DataTypes } from "./BaseDbObject.js";
import { Snowflake } from "./SnowflakeManager.js";
export declare abstract class BaseManager<Object extends BaseDbObject, Data extends DataTypes> {
    client: Client;
    cache: Map<string, Object>;
    abstract collection: DbCollection;
    abstract type: string;
    constructor(client: Client);
    get(id: Snowflake): Promise<Object>;
    resolveId(idOrInstance: Snowflake | Id<Base>): string;
    fetch(resolve: Object | Snowflake): Promise<Object>;
    create(data: Data): Promise<Object>;
    delete(id: Snowflake): Promise<void>;
    cacheSet(data: DataTypes): Promise<Object>;
    abstract build(data: DataTypes): Promise<Object>;
}
