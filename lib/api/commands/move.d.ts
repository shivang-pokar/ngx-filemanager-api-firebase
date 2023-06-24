import { Bucket } from '../../types/google-cloud-types';
import { CoreTypes } from '../../types';
export declare function moveWithChildren(bucket: Bucket, itemPath: string, newFolderPrefix: string): Promise<CoreTypes.ResultObj[]>;
export declare function MoveFiles(bucket: Bucket, items: string[], newDirectoryPath: string, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResultObj>;
