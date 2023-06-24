import { File } from '../types/google-cloud-types';
import { CoreTypes } from '../types';
declare function RetrieveFilePermissions(file: File): Promise<CoreTypes.FilePermissionsObject>;
declare function RetrieveCustomClaims(req: Request): Promise<CoreTypes.UserCustomClaims>;
declare function TryCheckHasAnyPermissions(claims: CoreTypes.UserCustomClaims): void;
export declare type FilePermission = 'write' | 'read';
declare function TryCheckFileAccess(filePermissions: CoreTypes.FilePermissionsObject, claims: CoreTypes.UserCustomClaims, toCheck: 'read' | 'write'): boolean;
declare function IsPartOfArray(arr: CoreTypes.FilePermissionEntity[], usersGroups: string[]): boolean;
declare function CheckCanEditPermissions(currentFilePermissions: CoreTypes.FilePermissionsObject, newPermissions: CoreTypes.FilePermissionsObject, claims: CoreTypes.UserCustomClaims): void;
export declare const permsQueries: {
    RetrieveFilePermissions: typeof RetrieveFilePermissions;
    RetrieveCustomClaims: typeof RetrieveCustomClaims;
    TryCheckHasAnyPermissions: typeof TryCheckHasAnyPermissions;
    TryCheckFileAccess: typeof TryCheckFileAccess;
    IsPartOfArray: typeof IsPartOfArray;
    CheckCanEditPermissions: typeof CheckCanEditPermissions;
};
export {};
