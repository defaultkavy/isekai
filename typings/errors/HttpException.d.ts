export declare class HttpException extends Error {
    status: number;
    message: string;
    constructor(message?: string, status?: number);
}
