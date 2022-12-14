import { Filter } from "mongodb";
import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { Conflict } from "../errors/Conflict.js";
import { NotFound } from "../errors/NotFound.js";
import { Base, Id } from "./Base.js";
import { BaseData, BaseDbObject } from "./BaseDbObject.js";
import { Snowflake } from "./SnowflakeManager.js";

export abstract class BaseManager<Object extends BaseDbObject, Data extends BaseData, ClientData extends BaseClientData> {
    client: Client;
    cache: Map<string, Object>
    abstract collection: DbCollection<Data>
    abstract type: string
    constructor(client: Client) {
        this.client = client
        this.cache = new Map()
    }

    async get(id: Snowflake) {
        const get = this.cache.get(id)
        if (get) return get
        return await this.fetch(id)
    }

    protected resolveId(idOrInstance: Snowflake | Id<Base>) {
        if (typeof idOrInstance === 'string') {
            return idOrInstance
        } else {
            return idOrInstance.id
        }
    }

    async fetch(resolve: Snowflake[]): Promise<Object[]>;
    async fetch(resolve: Object | Snowflake): Promise<Object>;
    async fetch(resolve: Object | Snowflake | Snowflake[]): Promise<Object | Object[]> {
        if (Array.isArray(resolve)) {
            // @ts-ignore
            const data = await this.collection.getDataByFilter({
                id: {
                    $in: resolve
                }
            });
            if (!data) throw new NotFound(`fetch: ${this.type} not exist.`);
            return this.__cacheSetList(data);
        } else{
            const id = this.resolveId(resolve);
            const data = await this.collection.getData(id);
            if (!data) throw new NotFound(`fetch: ${this.type} not exist.`);
            return this.__cacheSet(data);
        }
    }

    async fetchByFilter(filter: Filter<Data>) {
        const data = await this.collection.getDataByFilterOne(filter);
        if (!data) throw new NotFound(`fetch: ${this.type} not exist.`)
        return this.__cacheSet(data)
    }

    protected async __create(data: ClientData) {
        if (this.cache.has(data.id)
            || await this.collection.checkDuplicate(data.id)) 
            throw new Conflict(`create: ${this.type} id existed.`)
        Object.assign(data, {createdTimestamp: + new Date()})
        const object = this.build(data as unknown as Data)
        this.cache.set(object.id, object)
        await object.save()
        return object
    }

    async delete(id: Snowflake) {
        const object = await this.get(id);
        object.delete();
    }

    protected async __cacheSet(data: Data) {
        const object = this.build(data);
        this.cache.set(object.id, object);
        return object;
    }

    protected async __cacheSetList(arr: Data[]) {
        const objects = [];
        for (const data of arr) {
            objects.push(this.__cacheSet(data));
        } 
        return Promise.all(objects);
    }

    protected abstract build(data: Data): Object

}

export type BaseClientData = Omit<BaseData, 'createdTimestamp'>