import http from 'http'
import { Client } from './client/Client.js'

// MongoDB
import { MongoClient } from 'mongodb'
import cmd from './etc/cmd.js'
const config = require('../config.json')

const mongo = new MongoClient(config.mongodb.host, {
    auth: {
        username: config.mongodb.user, 
        password: config.mongodb.pwd
    }
})

Main()

async function Main() {
    const db = await dbconnect()
    
    const client = new Client({
        db: db
    })
    
    //http.createServer().listen(3010)

    test(client)
}

async function dbconnect() {
    console.log(cmd.Cyan, 'Connecting to MongoDB...')
    console.time('| MongoDB Connected')
    await mongo.connect()
    console.timeEnd('| MongoDB Connected')
    return mongo.db('animesekai')
}

async function test(client: Client) {
    client.users.delete('341769187842064385')
}