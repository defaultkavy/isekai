"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnowflakeManager = void 0;
class SnowflakeManager {
    constructor() {
        this.workerId = 0;
        this.epoch = +new Date(2020, 0);
        this.increment = 0;
        this.timestamp = +new Date;
        setInterval(this.tick.bind(this), 1);
    }
    generate() {
        this.increment++;
        const timestamp = +new Date;
        const newTime = timestamp - this.epoch;
        const newTimeBinary = newTime.toString(2);
        const workerBinary = this.workerId.toString(2).padStart(10, '0');
        const incrementBinary = this.increment.toString(2).padStart(12, '0');
        const snowflakeBinary = newTimeBinary + workerBinary + incrementBinary;
        return BigInt('0b' + snowflakeBinary).toString();
    }
    tick() {
        this.increment = 0;
        this.timestamp = +new Date;
    }
}
exports.SnowflakeManager = SnowflakeManager;
//# sourceMappingURL=SnowflakeManager.js.map