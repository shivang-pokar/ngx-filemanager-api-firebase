import { File } from '../../types/google-cloud-types';
import { Bucket } from '@google-cloud/storage';
import { CoreTypes } from '../../types';
export declare function TryChangeSingleFilePermissionsObject(file: File, newPermissions: CoreTypes.FilePermissionsObject, claims: CoreTypes.UserCustomClaims): Promise<{}>;
export declare function ChangePermissionsObject(bucket: Bucket, items: string[], permissionsObj: CoreTypes.FilePermissionsObject, isRecursive: boolean, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResultObj>;
