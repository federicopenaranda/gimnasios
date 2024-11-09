import { HttpStatus } from '@nestjs/common';

export interface ServerResponse {
    success: boolean;
    statusCode: HttpStatus;
    data: any;
    error: string;
    message: string;
}