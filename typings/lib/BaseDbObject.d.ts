import { Base } from "./Base.js";
import { BaseManager } from "./BaseManager.js";
import { BasePostData } from "./BasePost.js";
import { Snowflake } from "./SnowflakeManager.js";
import { UserData } from "./User.js";
export declare abstract class BaseDbObject extends Base {
    private collection;
    private manager;
    abstract id: Snowflake;
    constructor(manager: BaseManager<BaseDbObject, DataTypes>);
    save(): Promise<void>;
    delete(): Promise<void>;
    abstract toData(): DataTypes;
}
export declare type DataTypes = UserData | BasePostData;
