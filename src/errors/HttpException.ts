export class HttpException extends Error {
    public status: number
    public message: string
    constructor(message?: string, status: number = 500) {
        super(message)
        this.status = status
        this.message = message ?? 'Error'
    }
}