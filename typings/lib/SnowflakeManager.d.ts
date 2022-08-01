export declare class SnowflakeManager {
    workerId: number;
    epoch: number;
    increment: number;
    timestamp: number;
    constructor();
    generate(): Snowflake;
    tick(): void;
}
/**
 * An Twitter Snowflake ID.
 *
 * Use {@link SnowflakeManager} to generate Snowflake ID.
 */
export declare type Snowflake = string;
