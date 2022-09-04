import { Collection, Filter } from "mongodb";
import { Base } from "../lib/Base.js";
import { BaseData } from "../lib/BaseDbObject.js";
import { Snowflake } from "../lib/SnowflakeManager.js";
import { Email, Username } from "../lib/User.js";
import { Database } from "./Database.js";
export declare class DbCollection<D extends BaseData> extends Base {
    private _collection;
    constructor(parent: Database, collection: Collection);
    checkDuplicate(id: Snowflake): Promise<boolean>;
    checkDuplicateByFilter<D>(filter: Filter<D>): Promise<boolean>;
    getData(id: Snowflake): Promise<import("mongodb").WithId<import("bson").Document> | null>;
    getDataByFilterOne(filter: Filter<D>): Promise<D | null>;
    getDataByFilter(filter?: Filter<D>, limit?: number): Promise<import("mongodb").WithId<import("bson").Document>[] | null>;
    getDataByLastId(id: Snowflake, limit?: number, filter?: Filter<D>): Promise<import("mongodb").WithId<import("bson").Document>[]>;
    getNewestData(limit?: number): Promise<import("mongodb").WithId<import("bson").Document>[]>;
    getArraySlice(id: Snowflake, arrayField: string, slice: [number, number]): Promise<import("bson").Document[] | null>;
    saveData(id: Snowflake, data: D): Promise<void>;
    deleteData(id: Snowflake): Promise<import("mongodb").DeleteResult>;
}
export declare type FilterTypes = Snowflake | Email | Username;
