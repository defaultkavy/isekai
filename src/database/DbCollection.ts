import { Collection, Filter, FindOptions, Long } from "mongodb";
import { Base } from "../lib/Base.js";
import { BaseData } from "../lib/BaseDbObject.js";
import { Snowflake } from "../lib/SnowflakeManager.js";
import { Email, Username } from "../lib/User.js";
import { Database } from "./Database.js";

export class DbCollection<D extends BaseData> extends Base {
    private _collection: Collection
    constructor(parent: Database, collection: Collection) {
        super(parent.client)
        this._collection = collection
    }

    async checkDuplicate(id: Snowflake) {
        const find = await this._collection.findOne({id: id})
        return !!find
    }

    async checkDuplicateByFilter<D>(filter: Filter<D>) {
        const find = await this._collection.findOne(filter)
        return !!find
    }

    async getCount(filter: Filter<D>) {
        return await this._collection.countDocuments(filter);
    }

    async getData(id: Snowflake) {
        const find = await this._collection.findOne<D>({id: id})
        if (!find) return null
        return find
    }

    async getDataByFilterOne(filter: Filter<D>) {
        const find = await this._collection.findOne<D>(filter)
        if (!find) return null
        return find as D
    }

    async getDataByFilter(filter?: Filter<D>, limit = 100) {
        const cursor = this._collection.find(filter ?? {}).limit(limit);
        const find = await cursor.toArray();
        if (!find) return null;
        return find as unknown as D[];
    }

    async getDataByLastId(id: Snowflake, limit = 100, filter?: Filter<D>) {
        const int = Long.fromString(id)
        const cursor = this._collection.find({...filter, $expr: {$lt: [{'$toLong': '$id'}, int]}}).sort({createdTimestamp: -1}).limit(limit);
        const find = await cursor.toArray()
        return find as unknown as D[];
    }

    async getNewestData(limit?: number, filter?: Filter<D>) {
        const cursor = this._collection.find(filter ?? {}).sort({$natural:-1}).limit(limit ?? 100);
        const find = await cursor.toArray();
        return find as unknown as D[];
    }

    async getArraySlice(id: Snowflake, arrayField: string, slice: [number, number]) {
        const cursor = this._collection.find<D>({id: id}).project({[arrayField]: {$slice: slice}});
        const find = await cursor.toArray()
        if (!find) return null
        return find
    }

    async saveData(id: Snowflake, data: D) {
        await this._collection.updateOne({id: id}, {$set: data}, {upsert: true})
    }

    async deleteData(id: Snowflake) {
        return await this._collection.deleteOne({id: id})
    }
}

export type FilterTypes = Snowflake | Email | Username