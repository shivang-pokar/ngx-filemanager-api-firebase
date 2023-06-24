import { Bucket, File } from '../../types/google-cloud-types';
import { CoreTypes } from '../../types';
export declare function tryDeleteFile(file: File): Promise<boolean>;
export declare function RemoveFileWithChildren(bucket: Bucket, itemPath: string): Promise<boolean>;
export declare function RemoveFiles(bucket: Bucket, items: string[], claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResultObj>;
