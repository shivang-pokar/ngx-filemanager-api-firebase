import { File } from '../../types/google-cloud-types';
import { Bucket } from '@google-cloud/storage';
import { CoreTypes } from '../../types';
export declare function SetPermissionToObj(permissionsObj: CoreTypes.FilePermissionsObject, role: CoreTypes.PermissionsRole, entity: CoreTypes.FilePermissionEntity): CoreTypes.FilePermissionsObject;
export declare function ChangeSingleFilePermissionsAsSudo(file: File, role: CoreTypes.PermissionsRole, entity: CoreTypes.FilePermissionEntity): Promise<{}>;
export declare function TryChangeSingleFilePermissions(file: File, role: CoreTypes.PermissionsRole, entity: CoreTypes.FilePermissionEntity, claims: CoreTypes.UserCustomClaims): Promise<{}>;
export declare function ChangePermissions(bucket: Bucket, items: string[], role: CoreTypes.PermissionsRole, entity: CoreTypes.FilePermissionEntity, isRecursive: boolean, claims: CoreTypes.UserCustomClaims): Promise<CoreTypes.ResultObj>;
