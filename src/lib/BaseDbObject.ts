import { DbCollection } from "../database/DbCollection.js";
import { Base } from "./Base.js";
import { BaseClientData, BaseManager } from "./BaseManager.js";
import { Snowflake } from "./SnowflakeManager.js";

export abstract class BaseDbObject extends Base {
    private collection: DbCollection<BaseData>;
    private manager: BaseManager<BaseDbObject, BaseData, BaseClientData>
    abstract id: Snowflake
    abstract createdTimestamp: number;
    constructor(manager: BaseManager<BaseDbObject, BaseData, BaseClientData>) {
        super(manager.client)
        this.manager = manager
        this.collection = manager.collection
    }

    async save() {
        const data = this.toData()
        await this.collection.saveData(this.id, data)
    }

    async delete() {
        this.clear()
        await this.collection.deleteData(this.id)
    }

    async clear() {
        this.manager.cache.delete(this.id)
    }

    abstract toData(): BaseData
}

export interface BaseData {
    id: Snowflake,
    createdTimestamp: number
}