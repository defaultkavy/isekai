import { Collection } from "mongodb";
import { Base } from "../lib/Base.js";
import { DataTypes } from "../lib/BaseDbObject.js";
import { Snowflake } from "../lib/SnowflakeManager.js";
import { Database } from "./Database.js";
export declare class DbCollection extends Base {
    private collection;
    constructor(parent: Database, collection: Collection);
    checkIdDuplicate(id: Snowflake): Promise<boolean>;
    getData(id: Snowflake): Promise<import("mongodb").WithId<import("bson").Document> | null>;
    saveData(id: Snowflake, data: DataTypes): Promise<import("bson").Document>;
    deleteData(id: Snowflake): Promise<import("mongodb").DeleteResult>;
}
