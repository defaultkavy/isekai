"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_js_1 = require("./client/Client.js");
// MongoDB
const mongodb_1 = require("mongodb");
const cmd_js_1 = __importDefault(require("./etc/cmd.js"));
const config = require('../config.json');
const mongo = new mongodb_1.MongoClient(config.mongodb.host, {
    auth: {
        username: config.mongodb.user,
        password: config.mongodb.pwd
    }
});
Main();
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield dbconnect();
        const client = new Client_js_1.Client({
            db: db
        });
        //http.createServer().listen(3010)
        test(client);
    });
}
function dbconnect() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(cmd_js_1.default.Cyan, 'Connecting to MongoDB...');
        console.time('| MongoDB Connected');
        yield mongo.connect();
        console.timeEnd('| MongoDB Connected');
        return mongo.db('animesekai');
    });
}
function test(client) {
    return __awaiter(this, void 0, void 0, function* () {
        client.users.delete('341769187842064385');
    });
}
//# sourceMappingURL=server.js.map