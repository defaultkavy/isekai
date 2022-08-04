import { DbCollection } from "../database/DbCollection.js";
import { Base } from "./Base.js";
import { BaseManager } from "./BaseManager.js";
import { BasePostData } from "./BasePost.js";
import { Snowflake } from "./SnowflakeManager.js";
import { UserData } from "./User.js";

export abstract class BaseDbObject extends Base {
    private collection: DbCollection
    private manager: BaseManager<BaseDbObject, DataTypes>
    abstract id: Snowflake
    constructor(manager: BaseManager<BaseDbObject, DataTypes>) {
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

    abstract toData(): DataTypes
}

export type DataTypes = UserData | BasePostData