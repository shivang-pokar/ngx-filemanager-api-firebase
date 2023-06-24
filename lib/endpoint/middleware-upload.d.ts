/// <reference types="node" />
import { NextFunction } from 'express';
export declare const ParseUploadFile: (req: any, res: any, next: NextFunction) => Promise<void>;
export interface UploadedFile {
    buffer: Buffer;
    hash: string;
    mimetype: string;
    originalname: string;
}
