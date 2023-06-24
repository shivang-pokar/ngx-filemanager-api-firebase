import { Bucket } from '../../types/google-cloud-types';
import { CoreTypes } from '../../types';
export declare function copyWithChildren(bucket: Bucket, itemPath: string, newFolderPrefix: string): Promise<import("request").Response[]>;
export declare function CopyFiles(bucket: Bucket, items: string[], newDirectoryPath: string, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResultObj>;
