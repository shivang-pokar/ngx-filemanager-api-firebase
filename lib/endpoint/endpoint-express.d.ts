import { Storage } from '../types/google-cloud-types';
export interface FileManagerEndpointOptions {
    logging?: boolean;
    storage: Storage;
}
export declare const FileManagerEndpointExpress: (options: FileManagerEndpointOptions) => any;
