export declare const perms: {
    factory: {
        blankPermissionsObj: () => import("../types").CoreTypes.FilePermissionsObject;
        blankUserClaim: () => import("../types").CoreTypes.UserCustomClaims;
    };
    commands: {
        UpdateFilePermissions: (file: import("@google-cloud/storage/build/src/file").File, newPermissions: import("../types").CoreTypes.FilePermissionsObject) => Promise<{}>;
    };
    queries: {
        RetrieveFilePermissions: (file: import("@google-cloud/storage/build/src/file").File) => Promise<import("../types").CoreTypes.FilePermissionsObject>;
        RetrieveCustomClaims: (req: Request) => Promise<import("../types").CoreTypes.UserCustomClaims>;
        TryCheckHasAnyPermissions: (claims: import("../types").CoreTypes.UserCustomClaims) => void;
        TryCheckFileAccess: (filePermissions: import("../types").CoreTypes.FilePermissionsObject, claims: import("../types").CoreTypes.UserCustomClaims, toCheck: "read" | "write") => boolean;
        IsPartOfArray: (arr: string[], usersGroups: string[]) => boolean;
        CheckCanEditPermissions: (currentFilePermissions: import("../types").CoreTypes.FilePermissionsObject, newPermissions: import("../types").CoreTypes.FilePermissionsObject, claims: import("../types").CoreTypes.UserCustomClaims) => void;
    };
};
