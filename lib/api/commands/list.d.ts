import { Bucket } from '../../types/google-cloud-types';
import { CoreTypes } from '../../types';
export declare function GetList(bucket: Bucket, inputDirectoryPath: string, claims: CoreTypes.UserCustomClaims, isAdmin?: boolean): Promise<CoreTypes.ResFile[]>;
