import { Bucket } from '../../types/google-cloud-types';
import { CoreTypes } from '../../types';
export declare function RenameFile(bucket: Bucket, inputSrc: string, inputDest: string, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResultObj>;
