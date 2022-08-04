import { Collection } from "mongodb";
import { Email, Username } from "../index.js";
import { Base } from "../lib/Base.js";
import { DataTypes } from "../lib/BaseDbObject.js";
import { Snowflake } from "../lib/SnowflakeManager.js";
import { Database } from "./Database.js";

export class DbCollection extends Base {
    private collection: Collection
    constructor(parent: Database, collection: Collection) {
        super(parent.client)
        this.collection = collection
    }

    async checkDuplicate(id: Snowflake) {
        const find = await this.collection.findOne({id: id})
        return !!find
    }

    async checkDuplicateByFilter(filter: DbFilter) {
        const find = await this.collection.findOne(filter)
        return !!find
    }

    async getData(id: Snowflake) {
        const find = await this.collection.findOne({id: id})
        if (!find) return null
        return find
    }

    async getDataByFilter(filter: DbFilter) {
        const find = await this.collection.findOne(filter)
        if (!find) return null
        return find
    }

    async saveData(id: Snowflake, data: DataTypes) {
        const find = await this.collection.findOne({id: id})
        if (find) {
            return await this.collection.replaceOne({id: id}, data)
        } else {
            return await this.collection.insertOne(data)
        }
    }

    async deleteData(id: Snowflake) {
        return await this.collection.deleteOne({id: id})
    }
}

export type FilterTypes = Snowflake | Email | Username
export interface DbFilter {
    [key: string]: FilterTypes
}