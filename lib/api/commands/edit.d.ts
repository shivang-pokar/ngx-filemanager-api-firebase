import { Bucket } from '../../types/google-cloud-types';
import { CoreTypes } from '../../types';
export declare function EditFile(bucket: Bucket, item: string, content: string, claims: CoreTypes.UserCustomClaims): Promise<{
    success: boolean;
}>;
