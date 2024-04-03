export class HttpException extends Error {
    public readonly statusCode: number;
    public readonly message: string;
    public readonly data: string;
  
    constructor(statusCode: number, message: string, data: any) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}
  