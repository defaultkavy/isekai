import { Base } from "./Base.js";
import { BaseClientData, BaseManager } from "./BaseManager.js";
import { Snowflake } from "./SnowflakeManager.js";
export declare abstract class BaseDbObject extends Base {
    private collection;
    private manager;
    abstract id: Snowflake;
    abstract createdTimestamp: number;
    constructor(manager: BaseManager<BaseDbObject, BaseData, BaseClientData>);
    save(): Promise<void>;
    delete(): Promise<void>;
    clear(): Promise<void>;
    abstract toData(): BaseData;
}
export interface BaseData {
    id: Snowflake;
    createdTimestamp: number;
}
