import { Collection } from "mongodb";
import { Base } from "../lib/Base.js";
import { BaseData } from "../lib/BaseDbObject.js";
import { Snowflake } from "../lib/SnowflakeManager.js";
import { Email, Username } from "../lib/User.js";
import { Database } from "./Database.js";

export class DbCollection extends Base {
    private _collection: Collection
    constructor(parent: Database, collection: Collection) {
        super(parent.client)
        this._collection = collection
    }

    async checkDuplicate(id: Snowflake) {
        const find = await this._collection.findOne({id: id})
        return !!find
    }

    async checkDuplicateByFilter(filter: DbFilter) {
        const find = await this._collection.findOne(filter)
        return !!find
    }

    async getData(id: Snowflake) {
        const find = await this._collection.findOne({id: id})
        if (!find) return null
        return find
    }

    async getDataByFilter(filter: DbFilter) {
        const find = await this._collection.findOne(filter)
        if (!find) return null
        return find
    }

    async saveData(id: Snowflake, data: BaseData) {
        await this._collection.updateOne({id: id}, {$set: data}, {upsert: true})
    }

    async deleteData(id: Snowflake) {
        return await this._collection.deleteOne({id: id})
    }
}

export type FilterTypes = Snowflake | Email | Username
export interface DbFilter {
    [key: string]: FilterTypes
}