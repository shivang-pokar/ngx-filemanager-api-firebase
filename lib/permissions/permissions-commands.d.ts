import { File } from '../types/google-cloud-types';
import { CoreTypes } from '../types';
declare function UpdateFilePermissions(file: File, newPermissions: CoreTypes.FilePermissionsObject): Promise<{}>;
export declare const permsCommands: {
    UpdateFilePermissions: typeof UpdateFilePermissions;
};
export {};
