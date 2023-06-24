/// <reference types="node" />
import { Bucket, File } from '../../types/google-cloud-types';
import { CoreTypes } from '../../types';
export declare function SaveBufferToPath(file: File, mimetype: string, buffer: Buffer): Promise<void>;
export declare function GetNextFreeFilename(bucket: Bucket, inputFile: File): Promise<File>;
export declare function UploadFile(bucket: Bucket, directoryPath: string, originalname: string, mimetype: string, buffer: Buffer, claims: CoreTypes.UserCustomClaims): Promise<void>;
