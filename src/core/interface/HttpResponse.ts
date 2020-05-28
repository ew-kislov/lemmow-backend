export interface HttpResponse {
    statusCode: number;
    error: string;
    message?: string;
    data?: any;
}