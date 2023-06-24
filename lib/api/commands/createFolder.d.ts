import { Bucket, File } from '../../types/google-cloud-types';
import { CoreTypes } from '../../types';
export declare function CreateFolderWithoutPermissions(bucket: Bucket, newDirectoryPath: string): Promise<{
    success: boolean;
}>;
export declare function GetNextFreeFoldername(bucket: Bucket, targetChildDir: File): Promise<File>;
export declare function CreateFolder(bucket: Bucket, newDirectoryPath: string, claims: CoreTypes.UserCustomClaims, disableNoClobber?: boolean, isAdmin?: boolean): Promise<{
    success: boolean;
}>;
