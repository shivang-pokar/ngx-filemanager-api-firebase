import { Bucket } from '../../types/google-cloud-types';
import { CoreTypes } from '../../types';
export declare function GetSingle(bucket: Bucket, item: string, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResFile>;
