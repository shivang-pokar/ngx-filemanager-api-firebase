declare function HasPrefixSlash(inputPath: string): boolean;
declare function HasTrailingSlash(inputPath: string): boolean;
declare function EnsureTrailingSlash(inputPath: string): string;
declare function EnsureNoPrefixSlash(inputPath: string): string;
declare function EnsurePrefixSlash(inputPath: string): string;
declare function EnsureNoTrailingSlash(inputPath: string): string;
declare function EnsureAbsolutePathFile(filePath: string): string;
declare function EnsureAbsolutePathDir(folderPath: string): string;
declare function EnsureGoogleStoragePathDir(folderPath: string): string;
declare function EnsureGoogleStoragePathFile(filePath: string): string;
declare function GetRelativePath(currentDirectoryPath: string, absObjectPath: string): string;
declare function GetParentDir(currentDirectoryPath: string): string;
declare function IsCurrentPath(currentDirectoryPath: string, absObjectPath: string): boolean;
declare function IsCurrentPathFile(currentDirectoryPath: string, absObjectPath: string): boolean;
declare function IsObjNameDir(storageObjectName: string): boolean;
declare function IsObjNameFile(storageObjectName: string): boolean;
declare function GetSubDirectory(currentDirectoryPath: string, absObjectPath: string): string;
declare function Add2ToPath(inputPath: string): string;
declare function Add2ToPathDir(inputPath: string): string;
declare function GetFileNameWithExtension(inputPath: string): string;
declare function GetFileNameWithoutExtension(inputPath: string): string;
declare function GetPathUpToLastBracket(inputPath: string): string;
export declare const paths: {
    HasPrefixSlash: typeof HasPrefixSlash;
    HasTrailingSlash: typeof HasTrailingSlash;
    EnsureTrailingSlash: typeof EnsureTrailingSlash;
    EnsureNoPrefixSlash: typeof EnsureNoPrefixSlash;
    EnsurePrefixSlash: typeof EnsurePrefixSlash;
    EnsureNoTrailingSlash: typeof EnsureNoTrailingSlash;
    EnsureAbsolutePathFile: typeof EnsureAbsolutePathFile;
    EnsureAbsolutePathDir: typeof EnsureAbsolutePathDir;
    EnsureGoogleStoragePathDir: typeof EnsureGoogleStoragePathDir;
    EnsureGoogleStoragePathFile: typeof EnsureGoogleStoragePathFile;
    GetRelativePath: typeof GetRelativePath;
    IsCurrentPath: typeof IsCurrentPath;
    IsCurrentPathFile: typeof IsCurrentPathFile;
    IsObjNameDir: typeof IsObjNameDir;
    IsObjNameFile: typeof IsObjNameFile;
    GetSubDirectory: typeof GetSubDirectory;
    GetParentDir: typeof GetParentDir;
    GetFileNameWithExtension: typeof GetFileNameWithExtension;
    GetFileNameWithoutExtension: typeof GetFileNameWithoutExtension;
    GetPathUpToLastBracket: typeof GetPathUpToLastBracket;
    Add2ToPath: typeof Add2ToPath;
    Add2ToPathDir: typeof Add2ToPathDir;
};
export {};
