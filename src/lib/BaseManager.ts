import { Client } from "../client/Client.js";
import { DbCollection } from "../database/DbCollection.js";
import { Conflict } from "../errors/Conflict.js";
import { NotFound } from "../errors/NotFound.js";
import { Base, Id } from "./Base.js";
import { BaseDbObject, DataTypes } from "./BaseDbObject.js";
import { Snowflake } from "./SnowflakeManager.js";

export abstract class BaseManager<Object extends BaseDbObject, Data extends DataTypes> {
    client: Client;
    cache: Map<string, Object>
    abstract collection: DbCollection
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

    resolveId(idOrInstance: Snowflake | Id<Base>) {
        if (typeof idOrInstance === 'string') {
            return idOrInstance
        } else {
            return idOrInstance.id
        }
    }

    async fetch(resolve: Object | Snowflake) {
        const id = this.resolveId(resolve)
        const data = await this.collection.getData(id)
        if (!data) throw new NotFound(`fetch: ${this.type} not exist.`)
        return this.cacheSet(data as unknown as DataTypes)
    }

    async create(data: Data) {
        if (this.cache.has(data.id)
            || await this.collection.checkDuplicate(data.id)) 
            throw new Conflict(`create: ${this.type} id existed.`)
        const object = await this.build(data)
        this.cache.set(object.id, object)
        await object.save()
        return object
    }

    async delete(id: Snowflake) {
        const object = await this.get(id)
        object.delete()
    }

    async cacheSet(data: DataTypes) {
        const object = await this.build(data)
        this.cache.set(object.id, object)
        return object
    }

    abstract build(data: DataTypes): Promise<Object>

}