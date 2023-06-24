import { Bucket } from '../../types/google-cloud-types';
import { CoreTypes } from '../../types';
export declare function GetFileContent(bucket: Bucket, item: string, claims: CoreTypes.UserCustomClaims): Promise<string>;
