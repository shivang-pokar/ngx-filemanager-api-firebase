import * as request from 'request';
import { GetFilesOptions } from '@google-cloud/storage';
import { Bucket, File, FileFromStorage } from '../types/google-cloud-types';
import { CoreTypes } from '../types';
declare function GetAllChildrenWithPrefix(bucket: Bucket, fileOrDirectoryPath: string): Promise<File[]>;
declare function TryRenameFile(file: File, oldPrefix: string, newPrefix: string): Promise<CoreTypes.ResultObj>;
declare function TryCopyFile(file: File, oldPrefix: string, newPrefix: string): Promise<request.Response>;
declare function TryCheckWritePermission(bucket: Bucket, newDirPath: string, claims: CoreTypes.UserCustomClaims): Promise<any>;
interface FilesAndPrefixes {
    files: File[];
    prefixes: string[];
}
export declare function MakeOptionsListRoot(): GetFilesOptions;
export declare function MakeOptionsList(inputDirectoryPath: string): any;
export declare function GetFilesAndPrefixes(bucket: Bucket, options: GetFilesOptions): Promise<FilesAndPrefixes>;
export declare function GetFiles(bucket: Bucket, options: GetFilesOptions): Promise<FileFromStorage[]>;
export declare function GetListFromStorage(bucket: Bucket, inputDirectoryPath: string): Promise<FileFromStorage[]>;
export declare function GetListWithoutPermissions(bucket: Bucket, inputDirectoryPath: string): Promise<CoreTypes.ResFile[]>;
export declare const storage: {
    GetListWithoutPermissions: typeof GetListWithoutPermissions;
    GetAllChildrenWithPrefix: typeof GetAllChildrenWithPrefix;
    MakeOptionsListRoot: typeof MakeOptionsListRoot;
    MakeOptionsList: typeof MakeOptionsList;
    TryRenameFile: typeof TryRenameFile;
    TryCopyFile: typeof TryCopyFile;
    TryCheckWritePermission: typeof TryCheckWritePermission;
};
export {};
