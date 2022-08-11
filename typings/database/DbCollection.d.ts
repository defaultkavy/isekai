import { Collection } from "mongodb";
import { Base } from "../lib/Base.js";
import { BaseData } from "../lib/BaseDbObject.js";
import { Snowflake } from "../lib/SnowflakeManager.js";
import { Email, Username } from "../lib/User.js";
import { Database } from "./Database.js";
export declare class DbCollection extends Base {
    private _collection;
    constructor(parent: Database, collection: Collection);
    checkDuplicate(id: Snowflake): Promise<boolean>;
    checkDuplicateByFilter(filter: DbFilter): Promise<boolean>;
    getData(id: Snowflake): Promise<import("mongodb").WithId<import("bson").Document> | null>;
    getDataByFilterOne(filter: DbFilter): Promise<import("mongodb").WithId<import("bson").Document> | null>;
    getDataByFilter(filter: DbFilter): Promise<import("mongodb").WithId<import("bson").Document>[] | null>;
    saveData(id: Snowflake, data: BaseData): Promise<void>;
    deleteData(id: Snowflake): Promise<import("mongodb").DeleteResult>;
}
export declare type FilterTypes = Snowflake | Email | Username;
export interface DbFilter {
    [key: string]: FilterTypes;
}